from fastapi import Depends
from sqlalchemy.orm import Session

from config.database import get_db_connection
from models.models import Education
from repositories.BaseRepository import BaseRepository


class EducationRepository(BaseRepository[Education, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Education, db)

    def get_all_educations_cv(self, cv_id: int):
        return self.db.query(Education).filter_by(cv_id=cv_id).all()
    
    def get_education(self, education_id: int, cv_id: int):
        return self.db.query(Education).filter_by(id=education_id, cv_id=cv_id).first()
    
    def delete_education(self, education_id: int, cv_id:int):
        return self.db.query(Education).filter_by(id=education_id, cv_id=cv_id).first()
        