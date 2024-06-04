from fastapi import Depends, HTTPException, status
from models.models import Education
from repositories.EducationRepository import EducationRepository
from uuid import UUID
from schemas.EducationSchemas import EducationCreate, EducationSchema, EducationUpdate

class EducationService:

    def __init__(self, educationRepository: EducationRepository = Depends()):
        self.educationRepo = educationRepository

    def get_all_educations_cv(self, cv_id: int):
        return self.educationRepo.get_all_educations_cv(cv_id)
    
    def get_education_by_id(self, education_id: int, cv_id: int):
        education = self.educationRepo.get_education(education_id, cv_id)
        if not education:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education not found")
        return EducationSchema.from_orm(education)

    def delete_education(self, education_id: int, cv_id: int):
        education =  self.educationRepo.delete_education(education_id, cv_id)
        if not education:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education not found")
        return self.educationRepo.delete(education.id)
    
    def create_education(self, education: EducationCreate):
        new_education = Education(**education.dict())
        new_education = self.educationRepo.create(new_education)
        return EducationSchema.from_orm(new_education)
    
    def update_education(self, education: EducationUpdate):
        education_db = self.educationRepo.get_education(education.id, education.cv_id)
        if not education_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Education not found")
        print(education.dict())
        print("===============================================")
        education_db = self.educationRepo.update(education_db.id, education.dict())
        return EducationSchema.from_orm(education_db)