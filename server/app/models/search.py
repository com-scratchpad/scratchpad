from pydantic import BaseModel


# Specify query to search all documents
class ChunkRequest(BaseModel):
    query: str
    matches: int = 5


# Specify query and friend id to search friend
class SearchFriendsRequest(BaseModel):
    query: str
    friend_id: str
    matches: int = 5
