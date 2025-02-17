# Manages openai client connections
import os

from openai import OpenAI

def create_openai_client() -> OpenAI:
    openai_key = os.getenv("OPENAI_API_KEY")
    assert openai_key is not None

    return OpenAI(api_key=openai_key)


