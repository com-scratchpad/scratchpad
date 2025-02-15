from typing import List, Optional, Union
from pydantic import BaseModel
from fastapi import FastAPI, Request, Response


secure_app = FastAPI(root_path="/secure")
public_app = FastAPI(root_path="/public")

app = FastAPI()
app.mount("/secure", secure_app)
app.mount("/public", public_app)


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
        raise ValueError(f"""Unexpected embedding dimensions. Expected 1536,
                         got {len(embedding)}""")

    return embedding


@public_app.get("/")
def read_root():
    return {"Hello": "World"}


@public_app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@public_app.post("/items/")
async def create_item(item: ItemCreate):

    embedding = create_embedding(item.file_content)
    response = supabase.table("items").insert(
        {"user_name": item.user_name,
            "file_content": item.file_content, "embedding": embedding}
    ).execute()

    created_item = response.data[0]

    return {
        "id": created_item["id"],
        "user_name": created_item["user_name"],
        "file_content": created_item["file_content"],
        "embedding": created_item["embedding"]
    }


class RegisterRequest(BaseModel):
    email: str
    password: str


@public_app.post("/register/")
async def register(
        req: RegisterRequest,
):
    resp = supabase.auth.sign_up({
        "email": req.email,
        "password": req.password})
    print(resp)
    access_token = resp.get("access_token")
    return Response(access_token, status_code=200)


@public_app.post("/login")
async def login(
        email: str,
        password: str,
):
    resp = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password,
    })
    if resp.user is not None:
        print(resp.user.id)
    if resp.session is not None:
        return resp.session.access_token
    return Response(status_code=401)


@secure_app.middleware("http")
async def add_authentication(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    token = request.headers.get("authorization", "").replace("Bearer ", "")

    if not token:
        return Response("Unauthorized", status_code=401)

    try:
        auth = supabase.auth.get_user(token)
        if auth is not None and auth.user is not None:
            request.state.user_id = auth.user.id
        else:
            return Response("Failed to get user", status_code=401)
        supabase.postgrest.auth(token)

    except Exception:
        return Response("Invalid user token", status_code=401)

    return await call_next(request)
