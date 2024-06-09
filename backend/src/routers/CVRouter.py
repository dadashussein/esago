from typing import Annotated
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from models.models import User
from schemas.CVSchemas import CVCreateSchema, CVFirstSchema, CVUpdateSchema
from schemas.EducationSchemas import EducationCreate
from services.CVService import CVService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("")
def get_all_cv(user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_all_cvs(user_id)

@router.get("/all/{cv_id}")
def get_all_cv(cv_id:int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_cv_all(cv_id, user_id)

@router.get("/{cv_id}")
def get_cv_by_id(cv_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.get_cv_by_id(cv_id, user_id)


@router.post("")
def create_cv(cvRquest: CVCreateSchema, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.create_cv(cvRquest, user_id)

@router.post("/first")
def create_empty_cv(title:CVFirstSchema, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.create_empty_cv(title, user_id)

@router.put("")
def update_cv(cvRequest: CVUpdateSchema, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.update_cv(cvRequest, user_id)


@router.delete("/{cv_id}")
def delete_cv(cv_id: int, user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return cvService.delete_cv(cv_id, user_id)


@router.patch("/{cv_id}/picture")
async def upload_picture(cv_id: int, file:UploadFile = File(...), user_id: int = Depends(get_current_user_id), cvService: CVService = Depends()):
    return await cvService.upload_picture(cv_id, user_id, file)
