from uuid import UUID
from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import CV
from repositories.BaseRepository import BaseRepository
from schemas.CVSchemas import CVUpdateSchema


class CVRepository(BaseRepository[CV, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(CV, db)

    def get_cv_by_id(self, cv_id: int, user_id: UUID):
        return self.db.query(CV).filter_by(id=cv_id, user_id=user_id).first()

    def get_all_cvs(self, user_id: UUID):
        return self.db.query(CV).filter_by(user_id=user_id).all()
    
