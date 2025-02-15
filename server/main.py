from typing import List, Optional, Union
from httpx import HTTPError
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

def chunk_text(text: str, chunk_size: int = 1500, overlap: int = 150) -> List[Dict[str, str]]:
    # Encode text
    enc = tiktoken.get_encoding("cl100k_base")
    tokens = enc.encode(text)

    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = enc.decode(chunk_tokens)
        chunks.append({
            "content": chunk_text,
            "embedding": chunk_tokens
        })

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
    if not hasattr(request.state, 'user_id'):
        return Response("User not authenticated", status_code=401)

    document = supabase_client.table("Documents").insert({
        "user_id": request.state.user_id,
        "name": item.name,
    }).execute()
    
    
    document_id = document.data[0]["id"]
    chunks = chunk_text(item.file_content)
    saved_chunks = []
    
    print(chunks)

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
