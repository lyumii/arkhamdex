from fastapi import FastAPI
from routers import investigators

app = FastAPI()

app.include_router(investigators.router, tags=["Investigators"])