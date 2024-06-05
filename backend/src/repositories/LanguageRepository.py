from fastapi import Depends
from sqlalchemy.orm import Session
from uuid import UUID
from config.database import get_db_connection
from models.models import CV, Language
from repositories.BaseRepository import BaseRepository


class LanguageRepository(BaseRepository[Language, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Language, db)

    def get_all_languages_cv(self, cv_id: int, user_id: UUID) -> list[Language]:
        return self.db.query(Language).join(CV).filter(
            Language.cv_id == cv_id,
            CV.user_id == user_id
        ).all()

    def get_language_by_id(self, language_id: int, cv_id: int, user_id: UUID) -> Language:
        return self.db.query(Language).join(CV).filter(
            Language.id == language_id,
            Language.cv_id == cv_id,
            CV.user_id == user_id
        ).first()
