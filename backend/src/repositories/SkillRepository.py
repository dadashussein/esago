from fastapi import Depends
from sqlalchemy.orm import Session
from uuid import UUID
from config.database import get_db_connection
from models.models import CV, Skill
from repositories.BaseRepository import BaseRepository


class SkillRepository(BaseRepository[Skill, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Skill, db)
    
    def get_all_skills_cv(self, cv_id: int, user_id: UUID) -> list[Skill]:
        return self.db.query(Skill).join(CV).filter(
            Skill.cv_id == cv_id,
            CV.user_id == user_id
        ).all()

    def get_skill_by_id(self, skill_id: int, cv_id: int, user_id: UUID) -> Skill:
        return self.db.query(Skill).join(CV).filter(
            Skill.id == skill_id,
            Skill.cv_id == cv_id,
            CV.user_id == user_id
        ).first()
