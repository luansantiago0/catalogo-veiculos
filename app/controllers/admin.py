from fastapi import APIRouter, HTTPException, Body
from app.services.admin_service import create_admin
from app.models.user import CreateUser
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

@router.post("/create-user")
async def create_admin_endpoint(user: CreateUser, create_user_key: str = Body(...)):
    try:
        if create_user_key != os.getenv("CREATE_USER_KEY"):
            raise HTTPException(status_code=401, detail="Chave para criação de usuário inválida")
        create_admin(username=user.username, password=user.password)
        return {"message": "Usuário criado com sucesso"}
    except HTTPException as err:
        return err
