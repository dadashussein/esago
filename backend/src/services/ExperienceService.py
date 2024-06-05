from fastapi import Depends, HTTPException, status
from models.models import CV, Experience
from repositories.ExperienceRepository import ExperienceRepository
from uuid import UUID
from schemas.ExperienceSchemas import ExperienceCreate, ExperienceSchema, ExperienceUpdate

class ExperienceService:

    def __init__(self, experienceRepository: ExperienceRepository = Depends()):
        self.experienceRepo = experienceRepository

    def get_all_experiences_cv(self, cv_id: int, user_id: UUID) -> list[ExperienceSchema]:
        experiences = self.experienceRepo.get_all_experiences_cv(cv_id, user_id)
        return [ExperienceSchema.from_orm(experience) for experience in experiences]
    
    def get_experience_cv_by_id(self, experience_id: int, cv_id: int, user_id: UUID) -> ExperienceSchema:
        experience = self.experienceRepo.get_experience_by_id(experience_id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=404, detail="Experience not found")
        return ExperienceSchema.from_orm(experience)

    def create_experience_cv(self, experience_data: ExperienceCreate, cv_id: int, user_id: UUID) -> ExperienceSchema:
        experience_data_dict = experience_data.dict()
        experience_data_dict['cv_id'] = cv_id
        experience = Experience(**experience_data_dict)
        experience = self.experienceRepo.create(experience)
        return ExperienceSchema.from_orm(experience)
    
    def update_experience_cv(self, experience_data: ExperienceUpdate, cv_id: int, user_id: UUID) -> ExperienceSchema:
        experience = self.experienceRepo.get_experience_by_id(experience_data.id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=404, detail="Experience not found")
        experience_data_dict = experience_data.dict(exclude_unset=True)
        updated_experience = self.experienceRepo.update(experience_data.id, experience_data_dict)
        return ExperienceSchema.from_orm(updated_experience)
    
    def delete_experience_cv(self, experience_id: int, cv_id: int, user_id: UUID) -> ExperienceSchema:
        experience = self.experienceRepo.get_experience_by_id(experience_id, cv_id, user_id)
        if experience is None:
            raise HTTPException(status_code=404, detail="Experience not found")
        return self.experienceRepo.delete(experience_id)
