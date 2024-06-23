from typing import List
from uuid import UUID
from fastapi import Depends, HTTPException, Response, UploadFile
from schemas.ResumeSchema import HTMLContent, ResumeSchema
from models.models import CV
from repositories.CVRepository import CVRepository
from schemas.CVSchemas import CVCreateSchema, CVFirstSchema, CVSchema, CVAllSchema, CVUpdateSchema
from schemas.EducationSchemas import EducationSchema
from schemas.ExperienceSchemas import ExperienceSchema
from schemas.LanguageSchemas import LanguageSchema
from schemas.SkillSchemas import SkillSchema
from services.FileService import FileService
from config.config import configs
from pyppeteer import launch


class CVService:
    def __init__(self, cv_repo: CVRepository = Depends()):
        self.cv_repo = cv_repo

    def get_all_cvs(self, user_id: UUID) -> list[CVSchema]:
        cvs = self.cv_repo.get_all_cvs(user_id)
        return [CVSchema.model_validate(cv) for cv in cvs]

    def get_cv_all(self, cv_id: int, user_id: UUID) -> List[CVAllSchema]:
        cv = self.cv_repo.get_cv_all(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        cv_dict = cv.__dict__
        cv_dict['education'] = [EducationSchema.model_validate(
            education) for education in cv.educations]
        cv_dict['experience'] = [ExperienceSchema.model_validate(
            experience) for experience in cv.experiences]
        cv_dict['skill'] = [SkillSchema.model_validate(
            skill) for skill in cv.skills]
        cv_dict['language'] = [LanguageSchema.model_validate(
            language) for language in cv.languages]
        cv_dict['resume'] = [ResumeSchema.model_validate(
            resume) for resume in cv.resumes]
        return CVAllSchema.model_validate(cv_dict)

    def get_cv_by_id(self, cv_id: int, user_id: UUID) -> CVSchema:
        cv = self.cv_repo.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        return CVSchema.model_validate(cv)

    def create_empty_cv(self, title: CVFirstSchema, user_id: UUID):
        cv = CV(user_id=user_id, title=title.title)
        self.cv_repo.create(cv)
        return {"id": cv.id, "message": "CV created successfully"}

    def create_cv(self, cv_data: CVCreateSchema, user_id: UUID) -> CVSchema:
        cv_data_dict = cv_data.model_dump()
        cv_data_dict['user_id'] = user_id
        cv = CV(**cv_data_dict)
        self.cv_repo.create(cv)
        return {"message": "CV created successfully"}

    def delete_cv(self, cv_id: int, user_id: UUID) -> CVSchema:
        cv = self.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        self.cv_repo.delete(cv_id)
        return {"message": "CV deleted successfully"}

    def update_cv(self, update_data: CVUpdateSchema, user_id: UUID) -> bool:
        cv = self.get_cv_by_id(update_data.id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")

        update_data_dict = update_data.dict(exclude_unset=True)
        self.cv_repo.update(update_data.id, update_data_dict)
        return {"message": "CV updated successfully"}

    async def upload_picture(self, cv_id: int, user_id: UUID, file: UploadFile) -> bool:
        cv = self.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        filename = await FileService.upload(file, configs.CV_PICTURE_FOLDER)
        self.cv_repo.update(cv_id, {"picture": filename})
        return {"message": "Picture uploaded successfully"}

    def update_template_id(self, cv_id: int, template_id: int, user_id: UUID) -> bool:
        cv = self.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        self.cv_repo.update(cv_id, {"template_id": template_id})
        return {"message": "Template updated successfully"}

