from fastapi import Depends, HTTPException, status
from services.CVService import CVService
from models.models import Education
from repositories.EducationRepository import EducationRepository
from uuid import UUID
from schemas.EducationSchemas import EducationCreateSchema, EducationSchema, EducationUpdateSchema

class EducationService:
    def __init__(self, education_repo: EducationRepository = Depends(), cvService: CVService = Depends()):
        self.education_repo = education_repo
        self.cvService = cvService

    def get_all_educations_cv(self, cv_id: int, user_id: UUID) -> list[EducationSchema]:
        educations = self.education_repo.get_all_educations_cv(cv_id, user_id)
        return [EducationSchema.model_validate(education) for education in educations]
    
    def get_education_cv_by_id(self, education_id: int, cv_id: int, user_id: UUID) -> EducationSchema:
        education = self.education_repo.get_education_by_id(education_id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        return EducationSchema.model_validate(education)

    def create_education_cv(self, education_data: EducationCreateSchema, cv_id: int, user_id: UUID) -> dict:
        education_data_dict = education_data.model_dump()
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        education_data_dict['cv_id'] = cv_id
        education = Education(**education_data_dict)
        self.education_repo.create(education)
        return {"message": "Education created successfully"}
    
    def update_education_cv(self, education_data: EducationUpdateSchema, cv_id: int, user_id: UUID) -> dict:
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        education = self.education_repo.get_education_by_id(education_data.id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        education_data_dict = education_data.dict(exclude_unset=True)
        self.education_repo.update(education_data.id, education_data_dict)
        return {"message": "Education updated successfully"}
    
    def delete_education_cv(self, education_id: int, cv_id: int, user_id: UUID) -> dict:
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        education = self.education_repo.get_education_by_id(education_id, cv_id, user_id)
        if education is None:
            raise HTTPException(status_code=404, detail="Education not found")
        self.education_repo.delete(education_id)
        return {"message": "Education deleted successfully"}
