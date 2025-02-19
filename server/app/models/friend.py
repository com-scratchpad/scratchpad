from pydantic import BaseModel


# Specify the user_id to add as a friend
class AddFriendRequest(BaseModel):
    user_id: str

