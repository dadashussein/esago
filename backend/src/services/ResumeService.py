import uuid
from pathlib import Path
import aiofiles
from fastapi import Depends
from models.models import Resume
from repositories.ResumeRepository import ResumeRepository
from config.config import configs


class ResumeService:
    def __init__(self, resumeRepo: ResumeRepository = Depends()):
        self.resumeRepo = resumeRepo

    UPLOAD_DIRECTORY = configs.UPLOAD_DIR
    UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

    def create_resume(self, resume):
        self.resumeRepo.create(resume)

    def get_change_file_name(self, file):
        file.filename = uuid.uuid4().hex + f".{file.filename.split('.')[-1]}"
        return file

    async def upload_resume(self, file, user_id):
        file = self.get_change_file_name(file)
        file_path = self.UPLOAD_DIRECTORY / file.filename
        async with aiofiles.open(file_path, "wb") as buffer:
            data = await file.read()
            await buffer.write(data)
        resume = Resume()
        resume.path = file.filename
        resume.user_id = user_id
        self.create_resume(resume)
        return {"path": str(file.filename)}

    async def update_resume(self, id, user_id, file):
        resume = self.resumeRepo.get(id)
        if not resume:
            return {"message": "Resume not found."}
        if str(resume.user_id) != user_id:
            return {"message": "You do not have permission to update this resume."}
        file_path = self.UPLOAD_DIRECTORY / resume.path
        async with aiofiles.open(file_path, "wb") as buffer:
            data = await file.read()
            await buffer.write(data)
        self.resumeRepo.update(id, {"path": str(resume.path)})
        return {"path": str(resume.path)}

    def delete_resume(self, id, user_id):
        resume = self.resumeRepo.get(id)
        if not resume:
            return {"message": "Resume not found."}
        if str(resume.user_id) != user_id:
            return {"message": "You do not have permission to delete this resume."}
        self.resumeRepo.delete(id)
        return {"message": "Resume deleted successfully."}
