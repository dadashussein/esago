from fastapi import Depends, HTTPException, status
from models.models import CV, Education
from repositories.EducationRepository import EducationRepository
from uuid import UUID
from schemas.EducationSchemas import EducationCreate, EducationSchema, EducationUpdate

class EducationService:

    def __init__(self, educationRepository: EducationRepository = Depends()):
        self.educationRepo = educationRepository

    def get_all_educations_cv(self, cv_id: int, user_id: UUID) -> list[EducationSchema]:
        educations = self.educationRepo.get_all_educations_cv(cv_id, user_id)
        return [EducationSchema.model_validate(education) for education in educations]
    
    def get_education_cv_by_id(self, education_id: int, cv_id: int, user_id: UUID) -> EducationSchema:
        education = self.educationRepo.get_education_by_id(education_id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        return EducationSchema.model_validate(education)

    def create_education_cv(self, education_data: EducationCreate, cv_id: int, user_id: UUID) -> EducationSchema:
        education_data_dict = education_data.dict()
        education_data_dict['cv_id'] = cv_id
        education = Education(**education_data_dict)
        education = self.educationRepo.create(education)
        return EducationSchema.model_validate(education)
    
    def update_education_cv(self, education_data: EducationUpdate, cv_id: int, user_id: UUID) -> EducationSchema:
        education = self.educationRepo.get_education_by_id(education_data.id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        education_data_dict = education_data.dict(exclude_unset=True)
        updated_education = self.educationRepo.update(education_data.id, education_data_dict)
        return EducationSchema.model_validate(updated_education)
    
    def delete_education_cv(self, education_id: int, cv_id: int, user_id: UUID) -> EducationSchema:
        education = self.educationRepo.get_education_by_id(education_id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        return self.educationRepo.delete(education_id)