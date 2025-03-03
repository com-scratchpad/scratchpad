import tiktoken

from typing import List, Dict
from app.logging import logger


# Retrieve an embedding from tokenized chunk of text
def get_embedding(openai_client, chunk_tokens: List[int]):
    try:
        response = openai_client.embeddings.create(input=chunk_tokens,
                                                   model="text-embedding-ada-002") 
        return response.data[0].embedding  # Access the embedding
    except Exception as e:
        logger.e(f"Error occurred when retrieving embedding: {e}")


# Use tiktoken encoding to tokenize a text block
def tokenize_text(text: str):
    encoder = tiktoken.get_encoding("cl100k_base")
    return encoder, encoder.encode(text)


def chunk_text(openai_client, text: str, chunk_percentage: float = 0.05, 
                           min_chunk_size: int = 100, max_chunk_size: int = 1000, 
                           overlap_percentage: float = 0.1) -> List[Dict[str, str]]:
 
    encoder, tokens = tokenize_text(text)
    doc_size = len(tokens)
    
    # Calculate chunk size based on percentage of document
    target_chunk_size = max(min_chunk_size, min(max_chunk_size, int(doc_size * chunk_percentage)))
    
    # Calculate overlap size based on percentage of chunk size
    overlap_size = int(target_chunk_size * overlap_percentage)
    
    # Adjust chunking strategy based on document structure
    paragraphs = [p for p in text.split('\n\n') if p.strip()]
    
    # If we have clear paragraph structure, use it
    if len(paragraphs) > 5:
        return chunk_by_paragraphs_percentage(
            openai_client, paragraphs, encoder, 
            target_chunk_size, overlap_size
        )
    
    # Otherwise use token-based chunking with calculated overlap
    chunks = []
    for i in range(0, len(tokens), target_chunk_size - overlap_size):
        chunk_tokens = tokens[i:i + target_chunk_size]
        chunk_text = encoder.decode(chunk_tokens)
        chunks.append({
            "content": chunk_text,
            "embedding": get_embedding(openai_client, chunk_text)
        })

    return chunks

def chunk_by_paragraphs_percentage(openai_client, paragraphs, encoder, 
                                 target_size, overlap_size):
    """Chunk by paragraphs while targeting a percentage-based size."""
    chunks = []
    current_chunk = []
    current_size = 0
    
    for para in paragraphs:
        para_tokens = len(encoder.encode(para))
        
        # If this paragraph alone exceeds target size, split it
        if para_tokens > target_size:
            if current_chunk:
                # Add the current accumulated chunk first
                chunk_text = "\n\n".join(current_chunk)
                chunks.append({
                    "content": chunk_text,
                    "embedding": get_embedding(openai_client, chunk_text)
                })
                current_chunk = []
                current_size = 0
            
            # Then handle the large paragraph separately
            tokens = encoder.encode(para)
            for i in range(0, len(tokens), target_size - overlap_size):
                sub_para = encoder.decode(tokens[i:i + target_size])
                chunks.append({
                    "content": sub_para,
                    "embedding": get_embedding(openai_client, sub_para)
                })
        
        # Normal case - add to current chunk or start new one
        elif current_size + para_tokens > target_size:
            chunk_text = "\n\n".join(current_chunk)
            chunks.append({
                "content": chunk_text,
                "embedding": get_embedding(openai_client, chunk_text)
            })
            current_chunk = [para]
            current_size = para_tokens
        else:
            current_chunk.append(para)
            current_size += para_tokens
    
    # Don't forget the last chunk
    if current_chunk:
        chunk_text = "\n\n".join(current_chunk)
        chunks.append({
            "content": chunk_text,
            "embedding": get_embedding(openai_client, chunk_text)
        })
    
    return chunks
