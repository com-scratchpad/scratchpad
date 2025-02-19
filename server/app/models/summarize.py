from pydantic import BaseModel
from typing import List


# Summarize a list of chunks
class SummarizeRequest(BaseModel):
    chunks: List[str]
    name: str = "Summary"

