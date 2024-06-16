from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from config.security import JWTBearer, get_current_user_id
from schemas.ExperienceSchemas import  ExperienceSchema, ExperienceUpdateSchema
from services.ExperienceService import ExperienceService

router = APIRouter(dependencies=[Depends(JWTBearer())])


@router.get("/{experience_id}")
def get_experience_cv_by_id(
    experience_id: int, 
    cv_id: int, 
    user_id: UUID = Depends(get_current_user_id), 
    experienceService: ExperienceService = Depends()
) -> ExperienceSchema:
    return experienceService.get_experience_cv_by_id(experience_id, cv_id, user_id)

@router.get("")
def get_all_experiences_cv(
    cv_id: int, 
    user_id: UUID = Depends(get_current_user_id), 
    experienceService: ExperienceService = Depends()
) -> List[ExperienceSchema]:
    return experienceService.get_all_experiences_cv(cv_id, user_id)

@router.post("")
def create_experience_cv(
    cv_id: int, 
    experienceRequest: dict, 
    user_id: UUID = Depends(get_current_user_id), 
    experienceService: ExperienceService = Depends()
) -> dict:
    return experienceService.create_experience_cv(experienceRequest, cv_id, user_id)

@router.put("")
def update_experience_cv(
    experienceRequest: ExperienceUpdateSchema, 
    cv_id: int, 
    user_id: UUID = Depends(get_current_user_id), 
    experienceService: ExperienceService = Depends()
) -> dict:
    return experienceService.update_experience_cv(experienceRequest, cv_id, user_id)

@router.delete("/{experience_id}")
def delete_experience_cv(
    experience_id: int, 
    cv_id: int, 
    user_id: UUID = Depends(get_current_user_id), 
    experienceService: ExperienceService = Depends()
) -> dict:
    return experienceService.delete_experience_cv(experience_id, cv_id, user_id)
