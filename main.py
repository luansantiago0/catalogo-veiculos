from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import admin, cars, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(user.router)
app.include_router(cars.router)