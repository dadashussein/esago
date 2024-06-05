from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer,  get_current_user_id
from schemas.EducationSchemas import EducationCreate, EducationUpdate
from services.EducationService import EducationService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("/{education_id}")
def get_education_cv_by_id(education_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), educationService: EducationService = Depends()):
    return educationService.get_education_cv_by_id(education_id, cv_id, user_id)

@router.get("")
def get_all_educations_cv(cv_id: int, user_id: int = Depends(get_current_user_id), educationService: EducationService = Depends()):
    return educationService.get_all_educations_cv(cv_id, user_id)

@router.post("")
def create_education_cv(educationRequest: EducationCreate, cv_id: int, user_id: int = Depends(get_current_user_id), educationService: EducationService = Depends()):
    return educationService.create_education_cv(educationRequest, cv_id, user_id)

@router.put("")
def update_education_cv(educationRequest: EducationUpdate, cv_id: int, user_id: int = Depends(get_current_user_id), educationService: EducationService = Depends()):
    return educationService.update_education_cv(educationRequest, cv_id, user_id)

@router.delete("/{education_id}")
def delete_education_cv(education_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), educationService: EducationService = Depends()):
    return educationService.delete_education_cv(education_id, cv_id, user_id)
