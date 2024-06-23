from fastapi import Depends
from sqlalchemy.orm import Session
from uuid import UUID
from config.database import get_db_connection
from models.models import CV, Education, Experience
from repositories.BaseRepository import BaseRepository


class ExperienceRepository(BaseRepository[Experience, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Experience, db)

    def get_all_experiences_cv(self, cv_id: int, user_id: UUID) -> list[Experience]:
        return self.db.query(Experience).join(CV).filter(
            Experience.cv_id == cv_id,
            CV.user_id == user_id
        ).all()

    def get_experience_by_id(self, experience_id: int, cv_id: int, user_id: UUID) -> Experience:
        return self.db.query(Experience).join(CV).filter(
            Experience.id == experience_id,
            Experience.cv_id == cv_id,
            CV.user_id == user_id
        ).first()