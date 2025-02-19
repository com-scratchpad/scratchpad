import tiktoken

from typing import List, Dict


def get_embedding(openai_client, chunk_tokens: List[int]):
    try:
        response = openai_client.embeddings.create(input=chunk_tokens,
                                                   model="text-embedding-ada-002") 
        return response.data[0].embedding  # Access the embedding
    except Exception as e:
        print(f"Error occurred when retrieving embedding: {e}")


def tokenize_text(text: str):
    encoder = tiktoken.get_encoding("cl100k_base")
    return encoder, encoder.encode(text)


def chunk_text(openai_client, text: str, chunk_size: int = 256, overlap: int = 32) -> List[Dict[str, str]]:
    encoder, tokens = tokenize_text(text)
    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk_tokens = tokens[i:i + chunk_size]
        chunk_text = encoder.decode(chunk_tokens)
        chunks.append({
            "content": chunk_text,
            "embedding": get_embedding(openai_client, chunk_tokens)
        })

    return chunks

