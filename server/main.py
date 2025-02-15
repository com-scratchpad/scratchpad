from typing import List, Optional, Union
from pydantic import BaseModel
from fastapi import FastAPI, Request, Response
from supabase import create_client, Client
from openai import OpenAI
from dotenv import load_dotenv
from postgrest import APIError  # Add this import
import os
import tiktoken
from typing import Dict


load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"))

supabase: Client = create_client(url, key)

secure_app = FastAPI(openapi_prefix="/secure")
public_app = FastAPI(openapi_prefix="/public")

app = FastAPI()
app.mount("/secure", secure_app)
app.mount("/public", public_app)

def chunk_text(text: str, chunk_size: int = 1500, overlap: int = 150) -> List[Dict[str, str]]:
    enc = tiktoken.get_encoding("cl100k_base")
    tokens = enc.encode(text)
    print(tokens)
    chunks = []
    
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = enc.decode(chunk_tokens)
        chunks.append({
            "content": text,
            "chunk_index": len(chunks),
            "embedding": chunk_tokens
        })
        # print("CHUNK TEXT", chunk_text)
   
    
    return chunks



class ItemCreate(BaseModel):
    name: str
    file_content: str
    embedding: Optional[List[float]] = None


@secure_app.post("/items/")
async def create_item(item: ItemCreate, request: Request):
    if not hasattr(request.state, 'user_id'):
        return Response("User not authenticated", status_code=401)

    doc_response = supabase.table("Documents").insert({
        "user_id": request.state.user_id,
        "name": item.name,
    }).execute()
    
    
    document_id = doc_response.data[0]["id"]
    chunks = chunk_text(item.file_content)
    stored_chunks = []
    
    print(chunks)

    for chunk_index, chunk in enumerate(chunks):
        embedding = chunk["embedding"]
        chunk_data = {
            "document_id": document_id,
            "content": chunk["content"],
            "chunk_index": chunk_index,
            "embedding": embedding
            
        }
        print("EMBEDDING", embedding)
        
        print("response enter")
        try:

            response = supabase.table("Chunks").insert(chunk_data).execute()

            if response.data:
                print("no data")
                stored_chunks.append(response.data[0])
        
        except Exception as e:
            print(f"An error occurred: {e}") 
          
        
        print("response finish")

    
    return {
        "document_id": document_id,
        "total_chunks": len(stored_chunks),
        "chunks": stored_chunks
    }

@secure_app.middleware("http")
async def add_authentication(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    token = request.headers.get("authorization", "").replace("Bearer ", "")
    if not token:
        return Response("Unauthorized", status_code=401)

    auth = supabase.auth.get_user(token)
    if auth is not None and auth.user is not None:
        request.state.user_id = auth.user.id
    else:
        return Response("Failed to get user", status_code=401)
    
    supabase.postgrest.auth(token)
    return await call_next(request)

@secure_app.get("/items")
async def get_user_items(request: Request):
    user_id = request.state.user_id
    response = supabase.table("items").select("*").execute()
    return {"items": response.data}
