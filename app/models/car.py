from sqlalchemy import Column, Integer, String, Float
from app.database import Base
from pydantic import BaseModel

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    descricao = Column(String)
    valor = Column(Float)
    imagem_url = Column(String)

class CarResponse(BaseModel):
    id: int
    nome: str
    descricao: str
    valor: float
    imagem_url: str