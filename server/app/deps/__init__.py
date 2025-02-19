import os

from dotenv import load_dotenv
from openai import OpenAI
from supabase import create_client, Client

# Simply load dotenv so that env variables are 
# accessible in modules
load_dotenv()


# Create supabase client connection. Expects `SUPABASE_URL` and `SUPABASE_KEY`
# env variable
def create_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    assert url is not None
    key = os.getenv("SUPABASE_KEY")
    assert key is not None

    return create_client(url, key)


# Create openai client connection. Expects `OPENAI_API_KEY` env variable
def create_openai_client() -> OpenAI:
    openai_key = os.getenv("OPENAI_API_KEY")
    assert openai_key is not None

    return OpenAI(api_key=openai_key)



