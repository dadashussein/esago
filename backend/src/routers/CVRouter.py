from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from models.models import User
from schemas.CVSchemas import CVCreateSchema, CVUpdateSchema
from schemas.EducationSchemas import EducationCreate
from services.CVService import CVService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("")
def get_all_cv(user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_all_cvs(user_id)


@router.get("/{cv_id}")
def get_cv_by_id(cv_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_cv_by_id(cv_id, user_id)


@router.post("")
def create_cv(cvRquest: CVCreateSchema, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.create_cv(cvRquest, user_id)



@router.put("")
def update_cv(cvRequest: CVUpdateSchema, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.update_cv(cvRequest, user_id)


@router.delete("/{cv_id}")
def delete_cv(cv_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.delete_cv(cv_id, user_id)


@router.post("/{cv_id}/education")
def add_education_cv(cv_id: int, education: EducationCreate, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.add_education_cv(cv_id, education, user_id)


@router.delete("/{cv_id}/education/{education_id}")
def delete_education_cv(cv_id: int, education_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.delete_education_cv(cv_id, education_id, user_id)


@router.put("/{cv_id}/education/{education_id}")
def update_education_cv(cv_id: int, education_id: int, education: EducationCreate, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.update_education_cv(cv_id, education_id, education, user_id)


@router.get("/{cv_id}/education")
def get_education_cv(cv_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_education_cv(cv_id, user_id)