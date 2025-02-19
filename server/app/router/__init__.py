from fastapi import Depends, FastAPI
from starlette.middleware.base import BaseHTTPMiddleware

from app.router.dependencies import get_dependencies
from app.router.endpoints.document import create_document, delete_document, update_document
from app.router.endpoints.friend import add_friend
from app.router.endpoints.login import login
from app.router.endpoints.search import search, search_friends
from app.router.endpoints.summarize import summarize
from app.router.middleware.http import AuthMiddleware


def init_router():
    secure_app = FastAPI(dependencies=[Depends(get_dependencies)],
                         root_path="/secure")
    auth_middleware = AuthMiddleware()
    secure_app.add_middleware(BaseHTTPMiddleware, dispatch=auth_middleware)
    secure_app.add_api_route("/document", create_document, methods=["POST"])
    secure_app.add_api_route("/document", delete_document, methods=["DELETE"])
    secure_app.add_api_route("/document", update_document, methods=["PATCH"])
    secure_app.add_api_route("/friend", add_friend, methods=["POST"])
    secure_app.add_api_route("/search", search, methods=["POST"])
    secure_app.add_api_route("/search_friends", search_friends, methods=["POST"])
    secure_app.add_api_route("/summarize", summarize, methods=["POST"])

    public_app = FastAPI(dependencies=[Depends(get_dependencies)], root_path="/public")
    public_app.add_api_route("/login", login, methods=["POST"])

    router = FastAPI(dependencies=[Depends(get_dependencies)])
    router.mount("/secure", secure_app)
    router.mount("/public", public_app)

    return router
