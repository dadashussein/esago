import uuid
from fastapi import Depends
from models.models import Education
from repositories.EducationRepository import EducationRepository
from schemas.EducationSchemas import EducationCreate, EducationUpdate


class EducationService:
    def __init__(self, educationRepo: EducationRepository = Depends()):
        self.educationRepo = educationRepo

    def get_all_educations_user(self, user_id: uuid.UUID):
        return self.educationRepo.get_all_educations_user(user_id)

    async def add_education(self, user_id: uuid.UUID, education: EducationCreate):
        education = Education(**education.dict())
        education.user_id = user_id
        return self.educationRepo.create(education)

    def update_education(self, user_id: uuid.UUID, education_id: int, education: EducationUpdate):
        db_education = self.educationRepo.get(education_id)
        if not db_education:
            return {"message": "Education not found."}
        if str(db_education.user_id) != user_id:
            return {"message": "You do not have permission to update this education."}
        return self.educationRepo.update(education_id, education.dict(exclude_unset=True))

    def delete_education(self, user_id: uuid.UUID, education_id: int):
        db_education = self.educationRepo.get(education_id)
        if not db_education:
            return {"message": "Education not found."}
        if str(db_education.user_id) != user_id:
            return {"message": "You do not have permission to delete this education."}
        return self.educationRepo.delete(education_id)

    def get_education(self, education_id: int):
        return self.educationRepo.get(education_id)
