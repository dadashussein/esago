from dataclasses import asdict
from typing import List
from uuid import UUID
from fastapi import Depends, HTTPException, UploadFile
from services.CVService import CVService
from repositories.ResumeRepository import ResumeRepository
from config.mapper import map_schema_to_model
from models.models import CV, Education, Resume
from repositories.CVRepository import CVRepository
from schemas.CVSchemas import CVCreateSchema, CVFirstSchema, CVSchema, CVSchemaAll, CVUpdateSchema
from schemas.EducationSchemas import EducationCreate, EducationSchema
from schemas.ExperienceSchemas import ExperienceSchema
from schemas.LanguageSchemas import LanguageSchema
from schemas.SkillSchemas import SkillSchema
from services.FileService import FileService
from config.config import configs

class ResumeService:
    def __init__(self, resume_repo: ResumeRepository = Depends(), cv_service: CVService = Depends()):
        self.resume_repo = resume_repo
        self.cv_service = cv_service

    async def upload_file(self, user_id: UUID, cv_id:int, file: UploadFile):
        cv = self.cv_service.get_cv_by_id(cv_id, user_id)
        if not cv:
            raise HTTPException(status_code=404, detail="CV not found")
        
        filepath = await FileService.upload(file, configs.UPLOAD_RESUME_DIR)
        resume = Resume(cv_id=cv_id, path=filepath)
        self.resume_repo.create(resume)
