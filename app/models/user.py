from sqlalchemy import Column, Integer, String
from app.database import Base
from passlib.context import CryptContext
from pydantic import BaseModel


password_hashing = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    password = Column(String(255))

    
    def get_password_hash(password):
        return password_hashing.hash(password)

    @classmethod
    def create_user(cls, db, username: str, password: str):
        hashed_password = cls.get_password_hash(password)
        user = cls(username=username, password=hashed_password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

class CreateUser(BaseModel):
    username: str
    password: str
