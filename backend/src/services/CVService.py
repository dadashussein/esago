from dataclasses import asdict
from uuid import UUID
from fastapi import Depends, HTTPException
from config.mapper import map_schema_to_model
from models.models import CV, Education
from repositories.CVRepository import CVRepository
from schemas.CVSchemas import CVCreateSchema, CVSchema, CVUpdateSchema
from schemas.EducationSchemas import EducationCreate, EducationSchema
from services.FileService import FileService
from config.config import configs

class CVService:
    def __init__(self, cv_repo: CVRepository = Depends()):
        self.cv_repo = cv_repo

    def get_all_cvs(self, user_id: UUID) -> list[CVSchema]:
        cvs = self.cv_repo.get_all_cvs(user_id)
        return [CVSchema.from_orm(cv) for cv in cvs]

    def get_cv_by_id(self, cv_id: int, user_id: UUID) -> CVSchema:
        cv = self.cv_repo.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        return CVSchema.from_orm(cv)

    def create_empty_cv(self, user_id:UUID):
        cv = self.cv_repo.create(CV(user_id=user_id))
        return cv

    def create_cv(self, cv_data: CVCreateSchema, user_id: UUID) -> CVSchema:
        cv_data_dict = cv_data.dict()
        cv_data_dict['user_id'] = user_id
        cv = CV(**cv_data_dict)
        cv = self.cv_repo.create(cv)
        return CVSchema.from_orm(cv)

    def delete_cv(self, cv_id: int, user_id: UUID) -> CVSchema:
        cv = self.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        return self.cv_repo.delete(cv_id)
    
    def update_cv(self, update_data: CVUpdateSchema, user_id: UUID) -> bool:
        cv = self.get_cv_by_id(update_data.id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
    
        update_data_dict = update_data.dict(exclude_unset=True)
        updated_cv = self.cv_repo.update(update_data.id, update_data_dict)
        return CVSchema.from_orm(updated_cv) 
