import os
from typing import List, Optional, Union
from pydantic import BaseModel
from fastapi import FastAPI
from supabase import create_client, Client
import openai
from openai import OpenAI

url: str = "https://htjxsnnnkewusotqxwmy.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0anhzbm5ua2V3dXNvdHF4d215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjU4MTIsImV4cCI6MjA1MDMwMTgxMn0.EgBBkKpV_KtLJaNVWOGlR2bBTfUNzJoPURpcWnS8KvA"

client = OpenAI(
  api_key= "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")
supabase: Client = create_client(url, key)

app = FastAPI()

class ItemCreate(BaseModel):
    user_name: str  
    file_content: str
    embedding: Optional[List[float]] = None

def create_embedding(file_content):
    embedding_response = client.embeddings.create(
        input=file_content,
        model="text-embedding-ada-002"
    )
    
    embedding = embedding_response.data[0].embedding
    
    # Validation
    if len(embedding) != 1536:
        raise ValueError(f"Unexpected embedding dimensions. Expected 1536, got {len(embedding)}")
        
    return embedding


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/items/")
async def create_item(item: ItemCreate):

    embedding = create_embedding(item.file_content)
    response = supabase.table("items").insert(
        {"user_name": item.user_name, "file_content": item.file_content, "embedding": embedding}
    ).execute()


    created_item = response.data[0]

    return {
        "id": created_item["id"], 
        "user_name": created_item["user_name"],
        "file_content": created_item["file_content"],
        "embedding": created_item["embedding"]
    }