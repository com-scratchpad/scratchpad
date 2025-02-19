from fastapi import Request

from app.deps import create_openai_client, create_supabase_client


def get_dependencies(request: Request):
    request.state.supabase = create_supabase_client()
    request.state.openai = create_openai_client()


