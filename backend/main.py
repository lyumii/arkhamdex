from fastapi import FastAPI
from routers import investigators, cards

app = FastAPI()

app.include_router(investigators.router, tags=["Investigators"])
app.include_router(cards.router, tags=["Cards"])