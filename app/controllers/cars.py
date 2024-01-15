from fastapi import APIRouter, Form, Depends, UploadFile, HTTPException, File
from botocore.exceptions import NoCredentialsError
from sqlalchemy.orm import Session
from app.services.cars_service import read_cars, create_car, update_car, delete_car
from app.models.car import CarResponse
from typing import List, Optional
from app.database import get_db
from app.controllers.user import get_current_user
from dotenv import load_dotenv
import boto3
import os

load_dotenv()

BUCKET_NAME = os.getenv("BUCKET_NAME")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)

router = APIRouter()

@router.get("/carros", response_model=List[CarResponse])
async def read_cars_endpoint(db: Session = Depends(get_db)):
    return read_cars(db)

@router.post("/carros", response_model=CarResponse)
async def create_car_endpoint(
    nome: str = Form(...),
    descricao: str = Form(...),
    valor: float = Form(...),
    imagem: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Usuário não autenticado")  
    
    try:
        s3.upload_fileobj(imagem.file, BUCKET_NAME, imagem.filename)
        imagem = f"https://{BUCKET_NAME}.s3.amazonaws.com/{imagem.filename}"
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Erro de autenticação no S3")
    
    return create_car(db, nome, descricao, valor, imagem)

@router.put("/carros/{car_id}", response_model=CarResponse)
async def update_car_endpoint(
    car_id: int,
    nome: Optional[str] = Form(None),
    descricao: Optional[str] = Form(None),
    valor: Optional[float] = Form(None),
    imagem: UploadFile = File(None),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Usuário não autenticado")  
    
    try:
        if imagem:
            s3.upload_fileobj(imagem.file, BUCKET_NAME, imagem.filename)
            imagem = f"https://{BUCKET_NAME}.s3.amazonaws.com/{imagem.filename}"
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="Erro de autenticação no S3")
    
    return update_car(db, car_id, nome, descricao, valor, imagem)

@router.delete("/carros/{car_id}", response_model=dict)
async def delete_car_endpoint(
    car_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
    ):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Usuário não autenticado")  
    
    return delete_car(db, car_id)
