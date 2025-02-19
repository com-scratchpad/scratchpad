from pydantic import BaseModel


# Specify email and password to login existing user
class LoginRequest(BaseModel):
    email: str
    password: str
