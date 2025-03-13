from pydantic import BaseModel
from typing import List, Optional


# Specify name, file_content, and embedding type
class CreateDocumentRequest(BaseModel):
    name: str
    file_content: str
    file_type: str  
    embedding: Optional[List[float]] = None


# Specify document_id to delete
class DeleteDocumentRequest(BaseModel):
    document_id: str


# Specify document_id and file_content to update 
class UpdateDocumentRequest(BaseModel):
    document_id: str
    file_content: str
    file_type: Optional[str] = None  # Add this field as optional
