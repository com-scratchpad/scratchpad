from pydantic import BaseModel


class AddFriendRequest(BaseModel):
    user_id: str

