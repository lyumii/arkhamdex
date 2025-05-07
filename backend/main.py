from fastapi import FastAPI
from routers import investigators, cards, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(investigators.router, tags=["Investigators"])
app.include_router(cards.router, tags=["Cards"])
app.include_router(users.router, tags=["Users"])