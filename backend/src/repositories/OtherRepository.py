from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import Other, Resume
from repositories.BaseRepository import BaseRepository


class OtherRepository(BaseRepository[Other, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Other, db)
