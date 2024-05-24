from uuid import UUID

from fastapi import Depends
from sqlalchemy.orm import Session
from models.models import User
from config.database import get_db_connection
from repositories.BaseRepository import BaseRepository


class UserRepository(BaseRepository[User, UUID]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(User, db)
