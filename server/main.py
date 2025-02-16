from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI, Request, Response
from supabase import create_client, Client
from openai import OpenAI
from dotenv import load_dotenv
import os
import tiktoken
from typing import Dict


load_dotenv()

url = os.getenv("SUPABASE_URL")
assert url is not None
key = os.getenv("SUPABASE_KEY")
assert key is not None

supabase_client: Client = create_client(url, key)

openai_key = os.getenv("OPENAI_API_KEY")
assert openai_key is not None

openai_client = OpenAI(
    api_key=openai_key)

secure_app = FastAPI(openapi_prefix="/secure")
public_app = FastAPI(openapi_prefix="/public")

app = FastAPI()
app.mount("/secure", secure_app)
app.mount("/public", public_app)


class SummarizeRequest(BaseModel):
    chunks: List[str]
    name: str = "Summary"

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


@secure_app.get("/items")
async def get_user_items(_: Request):
    response = supabase_client.table("items").select("*").execute()
    return {"items": response.data}


class ItemCreate(BaseModel):
    name: str
    file_content: str
    embedding: Optional[List[float]] = None


@secure_app.post("/items/")
async def create_item(item: ItemCreate, request: Request):
    try:
        document = supabase_client.table("Documents").insert({
            "user_id": request.state.user_id,
            "name": item.name,
        }).execute()
    except Exception as e:
        print(f"Failed to save chunk with exception: {e}") 
        return {
                "message": f"Failed to save chunk with exception: {e}"
        }
          

    document_id = document.data[0]["id"]
    chunks = chunk_text(item.file_content)
    saved_chunks = []

    for idx, chunk in enumerate(chunks):
        chunk_data = {
            "document_id": document_id,
            "chunk_index": idx,
            "content": chunk["content"],
            "embedding":chunk["embedding"], 
        }

        try:
            document = supabase_client.table("Chunks").insert(chunk_data).execute()
            if document.data:
                saved_chunks.append(document.data[0])
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


class SearchRequest(BaseModel):
    query: str
    matches: int = 5


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


class SearchFriendsRequest(BaseModel):
    query: str
    friend_id: str
    matches: int = 5


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
    

class LoginRequest(BaseModel):
    email: str
    password: str


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


class AddFriendRequest(BaseModel):
    user_id: str


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


class DeleteRequest(BaseModel):
    document_id: str

@secure_app.delete("/document")
async def delete_document(request: DeleteRequest):
    document_id = request.document_id
    try:
        supabase_client.table("Documents").delete().eq("id", document_id).execute()
        supabase_client.table("Chunks").delete().eq("document_id", document_id).execute()
        return Response("Document deleted successfully", status_code=200)
    except Exception as e:
        print(f"Failed to delete document with exception: {e}")
