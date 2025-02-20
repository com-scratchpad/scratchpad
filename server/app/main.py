import uvicorn

from app.logging.settings import LOG_SETTINGS
from app.router import init_router


app = init_router()

if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8000
    uvicorn.run(app, port=8000, reload=True, log_config=LOG_SETTINGS)
