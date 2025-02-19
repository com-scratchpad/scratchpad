from typing import List, Dict
from fastapi import FastAPI, Request, Response
import tiktoken

from app.models.auth import LoginRequest
from app.models.document import CreateDocumentRequest, DeleteDocumentRequest, UpdateDocumentRequest
from app.models.friend import AddFriendRequest
from app.models.search import SearchFriendsRequest, SearchRequest
from app.models.summarize import SummarizeRequest

from .deps import create_openai_client, create_supabase_client

openai_client = create_openai_client()
supabase_client = create_supabase_client()

secure_app = FastAPI(openapi_prefix="/secure")
public_app = FastAPI(openapi_prefix="/public")

app = FastAPI()
app.mount("/secure", secure_app)
app.mount("/public", public_app)

CHUNKS_TABLE = "Chunks"
DOCUMENTS_TABLE = "Documents"


@secure_app.post("/summarize")
async def summarize(req: SummarizeRequest):
    chunks_text = "\n\n".join([f"Chunk {i+1}:\n{chunk}" for i, chunk in enumerate(req.chunks)])
    
    response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that combines text chunks into coherent notes. Maintain key information while ensuring smooth transitions and logical flow. Remove redundancies and organize the information clearly."
            },
            {
                "role": "user",
                "content": f"Please combine these text chunks into a single coherent note:\n\n{chunks_text}"
            }
        ],
        temperature=0.2,
        max_tokens=1500
    )
    
    summary = response.choices[0].message.content
    
    
    return {
        "summary": summary,
        "name": req.name
    }


def get_embedding(chunk_tokens: List[int]):
    try:
        response = openai_client.embeddings.create(input=chunk_tokens,
                                                   model="text-embedding-ada-002") 
        return response.data[0].embedding  # Access the embedding
    except Exception as e:
        print(f"Error occurred when retrieving embedding: {e}")


def tokenize_text(text: str):
    # Encode text
    encoder = tiktoken.get_encoding("cl100k_base")
    return encoder, encoder.encode(text)


def chunk_text(text: str, chunk_size: int = 256, overlap: int = 32) -> List[Dict[str, str]]:
    encoder, tokens = tokenize_text(text)
    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = encoder.decode(chunk_tokens)
        chunks.append({
            "content": chunk_text,
            "embedding": get_embedding(chunk_tokens)
        })
    print("chunks: ", chunks)

    return chunks


@secure_app.post("/document")
async def create_document(document: CreateDocumentRequest, request: Request):
    try:
        response = supabase_client.table(DOCUMENTS_TABLE).insert({
            "user_id": request.state.user_id,
            "name": document.name,
        }).execute()
    except Exception as e:
        print(f"Failed to save chunk with exception: {e}") 
        return {
                "message": f"Failed to save chunk with exception: {e}"
        }
          
    # If the document is empty, don't bother encoding saving content
    if document.file_content.strip() == "":
        return {
            "document_id": response.data[0]["id"],
            "total_chunks": 0,
            "chunks": []
        }

    document_id = response.data[0]["id"]
    chunks = chunk_text(document.file_content)
    saved_chunks = []

    for idx, chunk in enumerate(chunks):
        chunk_data = {
            "document_id": document_id,
            "chunk_index": idx,
            "content": chunk["content"],
            "embedding":chunk["embedding"], 
        }

        try:
            response = supabase_client.table(CHUNKS_TABLE).insert(chunk_data).execute()
            if response.data:
                saved_chunks.append(response.data[0])
        except Exception as e:
            print(f"Failed to save chunk with exception: {e}") 
            return {
                    "message": f"Failed to save chunk with exception: {e}"
            }
          
    return {
        "document_id": document_id,
        "total_chunks": len(saved_chunks),
        "chunks": saved_chunks
    }



@secure_app.post("/search")
async def search(search: SearchRequest, request: Request):
    _, tokens = tokenize_text(search.query)
    query_embedding = get_embedding(tokens)

    try:
        response = supabase_client.rpc("match_documents", {
            "p_query_embedding": query_embedding,
            "p_user_id": request.state.user_id
        }).execute()
        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        print(f"Failed to search: {e}")


@secure_app.post("/search_friends")
async def search_friends(search: SearchFriendsRequest, request: Request):
    _, tokens = tokenize_text(search.query)
    query_embedding = get_embedding(tokens)

    try:
        are_friends = supabase_client.rpc("are_friends", {
            "p_user_id": request.state.user_id,
            "p_friend_id": search.friend_id
        }).execute()
        if not bool(are_friends.data):
            return Response(status_code=404)

        response = supabase_client.rpc("match_documents", {
            "p_query_embedding": query_embedding,
            "p_user_id": search.friend_id
        }).execute()

        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        print(f"Failed request with: {e}")
    

@public_app.post("/login")
async def login(req: LoginRequest):
    resp = supabase_client.auth.sign_in_with_password({
        "email": req.email,
        "password": req.password,
    })
    if resp.user is not None:
        print(resp.user.id)
    if resp.session is not None:
        return resp.session.access_token
    return Response(status_code=401)


@secure_app.post("/friend")
async def insert_friend(friend: AddFriendRequest, request: Request):
    try:
        response = supabase_client.table("Friends").upsert({
            "id": request.state.user_id,
            "friend_id": friend.user_id
        }).execute()

        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        print(f"Failed request with: {e}")
    
    return Response(status_code=401)


@secure_app.middleware("http")
async def add_authentication(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    token = request.headers.get("authorization", "").replace("Bearer ", "")
    if not token:
        return Response("Unauthorized", status_code=401)

    auth = supabase_client.auth.get_user(token)
    if auth is not None and auth.user is not None:
        request.state.user_id = auth.user.id
    else:
        return Response("Failed to get user", status_code=401)
    

    supabase_client.postgrest.auth(token)
    return await call_next(request)


@secure_app.delete("/document")
async def delete_document(request: DeleteDocumentRequest):
    document_id = request.document_id
    try:
        supabase_client.table(DOCUMENTS_TABLE).delete().eq("id", document_id).execute()
        supabase_client.table(CHUNKS_TABLE).delete().eq("document_id", document_id).execute()
        return Response("Document deleted successfully", status_code=200)
    except Exception as e:
        print(f"Failed to delete document with exception: {e}")


@secure_app.patch("/document")
async def update_document(request: UpdateDocumentRequest):
    if request.file_content.strip() == "":
        return Response("Received empty file content, skipping chunk deletion", status_code=200)
    document_id = request.document_id
    chunks = chunk_text(request.file_content)
    # First, delete existing chunks for the document
    try:
        supabase_client.table(CHUNKS_TABLE).delete().eq("document_id", document_id).execute()
    except Exception as e:
        print(f"Failed to delete existing chunks with exception: {e}")
        return Response(f"Failed to delete existing chunks with exception: {e}", status_code=500)
    for idx, chunk in enumerate(chunks):
        
        # Then, insert new chunks
        chunk_data = {
            "document_id": document_id,
            "chunk_index": idx,
            "content": chunk["content"],
            "embedding": chunk["embedding"],
        }

        try:
            _ = supabase_client.table(CHUNKS_TABLE).insert(chunk_data).execute()
        except Exception as e:
            print(f"Failed to save chunk with exception: {e}") 
            return Response(f"Failed to save chunk with exception: {e}", status_code=500)
          
    return Response("Document updated successfully", status_code=200)
