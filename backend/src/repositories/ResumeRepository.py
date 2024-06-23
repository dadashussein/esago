from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import Resume
from repositories.BaseRepository import BaseRepository


class ResumeRepository(BaseRepository[Resume, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Resume, db)
