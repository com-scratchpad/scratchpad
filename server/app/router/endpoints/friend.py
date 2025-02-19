from fastapi import Request, Response
from app.models.friend import AddFriendRequest

# @secure_app.post("/friend")
async def add_friend(friend: AddFriendRequest, request: Request):
    try:
        response = request.state.supabase.table("Friends").upsert({
            "id": request.state.user_id,
            "friend_id": friend.user_id
        }).execute()

        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        print(f"Failed request with: {e}")
    
    return Response(status_code=401)

