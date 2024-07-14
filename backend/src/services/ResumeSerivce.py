from uuid import UUID
from fastapi import Depends, HTTPException, Response, UploadFile
from schemas.ResumeSchema import HTMLContent
from services.CVService import CVService
from repositories.ResumeRepository import ResumeRepository
from models.models import Resume
from services.FileService import FileService
from config.config import configs


class ResumeService:
    def __init__(self, resume_repo: ResumeRepository = Depends(), cv_service: CVService = Depends()):
        self.resume_repo = resume_repo
        self.cv_service = cv_service

    async def upload_file(self, user_id: UUID, cv_id: int, file: UploadFile):
        cv = self.cv_service.get_cv_by_id(cv_id, user_id)
        if not cv:
            raise HTTPException(status_code=404, detail="CV not found")

        filepath = await FileService.upload(file, configs.UPLOAD_RESUME_DIR)
        resume = Resume(cv_id=cv_id, path=filepath)
        self.resume_repo.create(resume)
