"""CV Routers"""
from typing import Annotated
from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session
from services.ResumeSerivce import ResumeService
from config.security import JWTBearer, get_current_user_id
from schemas.CVSchemas import CVCreateSchema, CVFirstSchema, CVUpdateSchema
from schemas.EducationSchemas import EducationCreateSchema
from services.CVService import CVService

router = APIRouter(dependencies=[Depends(JWTBearer())])

@router.post(
    "/upload-resume",
    status_code=status.HTTP_201_CREATED,
    summary="Upload resume",
)
async def upload_resume(
    user_id: str = Depends(get_current_user_id),
    cv_id: int = None,
    file: UploadFile = File(...),
    resume_service: ResumeService = Depends(),
):
    """
        Upload a resume file for a specific user. Optionally associates the file with a CV ID.
    """
    return await resume_service.upload_file(user_id, cv_id, file)

