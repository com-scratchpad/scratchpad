from fastapi import Request, Response
from app.models.friend import AddFriendRequest
from app.logging import logger

async def add_friend(friend: AddFriendRequest, request: Request):
    try:
        response = request.state.supabase.table("Friends").upsert({
            "id": request.state.user_id,
            "friend_id": friend.user_id
        }).execute()

        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        logger.e(f"Failed request with: {e}")
    
    return Response(status_code=401)

