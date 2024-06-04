from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer,  get_current_user_id
from schemas.EducationSchemas import EducationCreate, EducationUpdate
from services.EducationService import EducationService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("/cv/{cv_id}")
def get_all_education(cv_id: int, education_service: EducationService = Depends()):
    return education_service.get_all_educations_cv(cv_id)


@router.get("/{cv_id}/{eudcation_id}")
def get_education_by_id(eudcation_id: int, cv_id: int, education_service: EducationService = Depends()):
    return education_service.get_education_by_id(eudcation_id, cv_id)


@router.post("")
def create_education(education_request: EducationCreate, education_service: EducationService = Depends()):
    return education_service.create_education(education_request)


@router.put("")
def update_education(education_request: EducationUpdate, education_service: EducationService = Depends()):
    return education_service.update_education(education_request)


@router.delete("/{cv_id}/{education_id}")
def delete_education(education_id: int, cv_id, education_service: EducationService = Depends()):
    return education_service.delete_education(education_id, cv_id)
