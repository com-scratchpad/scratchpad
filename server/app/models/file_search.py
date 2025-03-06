from pydantic import BaseModel
from typing import List, Optional

class FileSearchRequest(BaseModel):
    query: str
    file_type: Optional[str] = None  # Add file type filter

class FileSearchResponse(BaseModel):
    results: List[dict]