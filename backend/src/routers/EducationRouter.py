from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer,  get_current_user_id
from schemas.EducationSchemas import EducationCreate, EducationUpdate
from services.EducationService import EducationService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("")
def get_all_Education(user_id: int = Depends(get_current_user_id), education_service: EducationService = Depends()):
    return education_service.get_all_Educations(user_id)


@router.get("/{eudcation_id}")
def get_Education_by_id(eudcation_id: int, user_id: int = Depends(get_current_user_id), education_service: EducationService = Depends()):
    return education_service.get_Education_by_id(eudcation_id, user_id)


@router.post("")
def create_Education(education_request: EducationCreate, user_id: int = Depends(get_current_user_id), education_service: EducationService = Depends()):
    return education_service.create_Education(education_request, user_id)


@router.put("")
def update_Education(education_request: EducationUpdate, user_id: int = Depends(get_current_user_id), education_service: EducationService = Depends()):
    return education_service.update_Education(education_request, user_id)


@router.delete("/{eudcation_id}")
def delete_Education(eudcation_id: int, user_id: int = Depends(get_current_user_id), education_service: EducationService = Depends()):
    return education_service.delete_Education(eudcation_id, user_id)
