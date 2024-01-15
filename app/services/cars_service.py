from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.car import Car, CarResponse

def read_cars(db: Session):
    cars = db.query(Car).order_by(Car.valor).all()
    return [CarResponse(**car.__dict__) for car in cars]

def create_car(db: Session, nome: str, descricao: str, valor: float, imagem_url: str):
    car = Car(nome=nome, descricao=descricao, valor=valor, imagem_url=imagem_url)
    db.add(car)
    db.commit()
    db.refresh(car)
    return CarResponse(id=car.id, nome=car.nome, descricao=car.descricao, valor=car.valor, imagem_url=car.imagem_url)

def update_car(db: Session, car_id: int, nome: str, descricao: str, valor: float, imagem_url: str):
    car_db = db.query(Car).filter(Car.id == car_id).first()
    if car_db is None:
        raise HTTPException(status_code=404, detail="Carro não encontrado")

    if nome is not None:
        car_db.nome = nome
    if descricao is not None:
        car_db.descricao = descricao
    if valor is not None:
        car_db.valor = valor
    if imagem_url is not None:
        car_db.imagem_url = imagem_url

    db.commit()
    db.refresh(car_db)
    return CarResponse(**car_db.__dict__)

def delete_car(db: Session, car_id: int):
    car_db = db.query(Car).filter(Car.id == car_id).first()
    if car_db is None:
        raise HTTPException(status_code=404, detail="Carro não encontrado")

    db.delete(car_db)
    db.commit()

    return {"message": "Carro excluído com sucesso"}
