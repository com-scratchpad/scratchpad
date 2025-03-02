from fastapi import Request, Response

from app.common.text import get_embedding, tokenize_text
from app.models.search import SearchFriendsRequest, SearchRequest
from app.logging import logger


async def search(search: SearchRequest, request: Request):
    _, tokens = tokenize_text(search.query)
    query_embedding = get_embedding(request.state.openai, tokens)

    try:
        response = request.state.supabase.rpc("match_documents", {
            "p_query_embedding": query_embedding,
            "p_user_id": request.state.user_id
            }).execute()
        return {"chunks": response.data}
    except Exception as e:
        logger.error(f"Failed to search: {e}")


async def search_friends(search: SearchFriendsRequest, request: Request):
    _, tokens = tokenize_text(search.query)
    query_embedding = get_embedding(request.state.openai, tokens)

    try:
        are_friends = request.state.supabase.rpc("are_friends", {
            "p_user_id": request.state.user_id,
            "p_friend_id": search.friend_id
        }).execute()
        if not bool(are_friends.data):
            return Response(status_code=404)

        response = request.state.supabase.rpc("match_documents", {
            "p_query_embedding": query_embedding,
            "p_user_id": search.friend_id
        }).execute()

        return {"chunks" : response.data } # Return the data from the successful response
    except Exception as e:
        logger.e(f"Failed request with: {e}")
    


