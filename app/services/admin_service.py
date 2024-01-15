from app.models.user import User
from app.database import get_db

def create_admin(username: str, password: str):
    db = next(get_db())
    return User.create_user(db, username, password)
