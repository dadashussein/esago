from fastapi import HTTPException, status
from models.models import Education
from repositories import EducationRepository
from uuid import UUID
from schemas.EducationSchemas import EducationCreate, EducationSchema, EducationUpdate

class EducationService:

    def __init__(self, educationRepository: EducationRepository):
        self.educationRepo = educationRepository

    def get_all_educations_user(self, user_id: UUID):
        return self.educationRepo.get_all_educations_user(user_id)
    
    def delete_education(self, education_id: int, user_id: UUID):
        education =  self.educationRepo.delete_education(education_id, user_id)
        if not education:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education not found")
        return self.educationRepo.delete(education.id)
    
    def create_education(self, education: EducationCreate, user_id: UUID):
        new_education = Education(**education.dict())
        new_education.user_id = user_id
        new_education = self.educationRepo.create(new_education)
        return EducationSchema.from_orm(new_education)
    
    def update_education(self, education: EducationUpdate, user_id: UUID):
        education_db = self.educationRepo.get_education(education.id, user_id)
        if not education_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education not found")
        education_db = self.educationRepo.update(education_db, education.dict())
        return EducationSchema.from_orm(education_db)