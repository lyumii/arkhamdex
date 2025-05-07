from sqlalchemy.orm import Session
from models import User
from passlib.hash import pbkdf2_sha256
import uuid
from schemas import UserCreate

def get_user_by_username(username: str, db:Session):
    return db.query(User).filter(User.username == username).first()

def create_user(user_data: UserCreate, db: Session):
    hashed_pwd = pbkdf2_sha256.hash(user_data.password)

    db_user = User(
        id=str(uuid.uuid4()),
        username = user_data.username,
        password = hashed_pwd

    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if user and pbkdf2_sha256.verify(password, user.password):
        return user
    return None

