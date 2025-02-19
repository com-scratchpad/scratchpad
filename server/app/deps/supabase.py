# Manages supabase client connections
import os

from supabase import create_client, Client

def create_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    assert url is not None
    key = os.getenv("SUPABASE_KEY")
    assert key is not None

    return create_client(url, key)

