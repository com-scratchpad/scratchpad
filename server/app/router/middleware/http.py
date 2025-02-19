from fastapi import Request, Response
from app.router.dependencies import get_dependencies


class AuthMiddleware:
    def __init__(self):
        pass

    async def __call__(self, request: Request,  call_next):
        get_dependencies(request)
        supabase_client = request.state.supabase
        if request.method == "OPTIONS":
            return await call_next(request)

        token = request.headers.get("authorization", "").replace("Bearer ", "")
        if not token:
            return Response("Unauthorized", status_code=401)

        auth = supabase_client.auth.get_user(token)
        if auth is not None and auth.user is not None:
            request.state.user_id = auth.user.id
        else:
            return Response("Failed to get user", status_code=401)
        

        supabase_client.postgrest.auth(token)
        return await call_next(request)
