from fastapi import Request, Response
from app.models.auth import LoginRequest


async def login(login: LoginRequest, request: Request):
    resp = request.state.supabase.auth.sign_in_with_password({
        "email": login.email,
        "password": login.password,
    })
    print(resp)
    if resp.session is not None:
        return {
            "user": resp.user,
            "token": resp.session.access_token,
        }

    return Response(status_code=401)
