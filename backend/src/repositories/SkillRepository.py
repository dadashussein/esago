from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import Skill
from repositories.BaseRepository import BaseRepository


class SkillRepository(BaseRepository[Skill, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Skill, db)

    def get_all_educations_user(self, user_id: int):
        return self.db.query(Skill).filter_by(user_id=user_id).all()
