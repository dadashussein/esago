import uuid
from pathlib import Path
import aiofiles
from fastapi import Depends, UploadFile
from models.models import Resume
from repositories.ResumeRepository import ResumeRepository
from config.config import configs
from services.FileService import FileService


class ResumeService:
    def __init__(self, resumeRepo: ResumeRepository = Depends()):
        self.resumeRepo = resumeRepo

    def create_resume(self, resume):
        self.resumeRepo.create(resume)

    async def upload_resume(self, file: UploadFile, user_id):
        filename = await FileService.upload(file, configs.UPLOAD_RESUME_DIR)
        resume = Resume()
        resume.path = filename
        resume.user_id = user_id
        self.create_resume(resume)
        return {"path": filename}

    async def update_resume(self, id, user_id, file):
        resume = self.resumeRepo.get(id)
        if not resume:
            return {"message": "Resume not found."}
        if str(resume.user_id) != user_id:
            return {"message": "You do not have permission to update this resume."}
        filename = await FileService.upload(file, configs.UPLOAD_RESUME_DIR)
        self.resumeRepo.update(id, {"path": str(filename)})
        return {"path": str(resume.path)}

    def delete_resume(self, id, user_id):
        resume = self.resumeRepo.get(id)
        if not resume:
            return {"message": "Resume not found."}
        if str(resume.user_id) != user_id:
            return {"message": "You do not have permission to delete this resume."}
        self.resumeRepo.delete(id)
        return {"message": "Resume deleted successfully."}
