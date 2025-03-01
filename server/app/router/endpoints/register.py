from fastapi import Request, Response
from fastapi.responses import JSONResponse
from app.models.auth import RegisterRequest

async def register(register: RegisterRequest, request: Request):
    resp = request.state.supabase.auth.sign_up({
        "email": register.email,
        "password": register.password,
    })
    
    if resp.user is not None:
        session_data = None
        if resp.session:
            session_data = {
                "user": resp.user,
                "access_token": resp.session.access_token
            }
        else:
            # User created but needs email verification
            return JSONResponse(
                status_code=201,
                content={"message": "Please verify your email to complete registration"}
            )
            
        return session_data

    return JSONResponse(status_code=400, content={"error": "Registration failed"})