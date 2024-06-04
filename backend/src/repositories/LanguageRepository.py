from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import Language
from repositories.BaseRepository import BaseRepository


class LanguageRepository(BaseRepository[Language, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Language, db)

    def get_all_educations_user(self, user_id: int):
        return self.db.query(Language).filter_by(user_id=user_id).all()
