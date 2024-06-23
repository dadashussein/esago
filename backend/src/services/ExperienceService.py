from fastapi import Depends, HTTPException, status
from models.models import Experience
from repositories.ExperienceRepository import ExperienceRepository
from uuid import UUID
from schemas.ExperienceSchemas import ExperienceCreateSchema, ExperienceUpdateSchema, ExperienceSchema

class ExperienceService:

    def __init__(self, experienceRepository: ExperienceRepository = Depends()):
        self.experienceRepo = experienceRepository

    def get_all_experiences_cv(self, cv_id: int, user_id: UUID) -> list[ExperienceSchema]:
        experiences = self.experienceRepo.get_all_experiences_cv(cv_id, user_id)
        return [ExperienceSchema.model_validate(experience) for experience in experiences]
    
    def get_experience_cv_by_id(self, experience_id: int, cv_id: int, user_id: UUID) -> ExperienceSchema:
        experience = self.experienceRepo.get_experience_by_id(experience_id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
        return ExperienceSchema.model_validate(experience)

    def create_experience_cv(self, experience_data: ExperienceCreateSchema, cv_id: int, user_id: UUID) -> dict:
        experience_data_dict = experience_data
        experience_data_dict['cv_id'] = cv_id
        experience = Experience(**experience_data_dict)
        self.experienceRepo.create(experience)
        return {"message": "Experience created successfully"}

    
    def update_experience_cv(self, experience_data: ExperienceUpdateSchema, cv_id: int, user_id: UUID) -> dict:
        experience = self.experienceRepo.get_experience_by_id(experience_data.id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
        experience_data_dict = experience_data.model_dump()
        experience_data_dict['cv_id'] = cv_id
        self.experienceRepo.update(experience_data.id, experience_data_dict)
        return {"message": "Experience updated successfully"}
    
    def delete_experience_cv(self, experience_id: int, cv_id: int, user_id: UUID) -> dict:
        experience = self.experienceRepo.get_experience_by_id(experience_id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
        self.experienceRepo.delete(experience_id)
        return {"message": "Experience deleted successfully"}
