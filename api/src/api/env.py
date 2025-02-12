from dotenv import dotenv_values
from supabase import create_client, Client
from openai import OpenAI


# Loads the dotenv
def __load_env():
    return dotenv_values(".env")


def init_supabase() -> Client:
    env = __load_env()
    url = env["SUPABASE_URL"]
    assert url is not None
    key = env["SUPABASE_API_KEY"]
    assert key is not None
    return create_client(url, key)


def init_openai():
    env = __load_env()
    key = env["OPENAI_API_KEY"]
    assert key is not None
    return OpenAI(api_key=key)


# Why doesn't this work?
__all__ = ["init_supabase", "init_openai"]
