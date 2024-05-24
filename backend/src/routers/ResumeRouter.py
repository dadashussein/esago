from fastapi import APIRouter, Depends, UploadFile, File
from typing import Annotated
import uuid
from sqlalchemy.orm import Session

from config.security import JWTBearer, get_current_user
from models.models import User
from services.ResumeService import ResumeService
from services.UserService import UserService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]


@router.post("")
async def upload_resume(file: UploadFile = File(...), current_user: User = Depends(get_current_user), resume_service: ResumeService = Depends()):
    return await resume_service.upload_resume(file, current_user['id'])


@router.get("")
async def get_resumes(current_user: User = Depends(get_current_user), user_service: UserService = Depends()):
    print(current_user)
    return user_service.get_all_resumes_user(current_user['id'])


@router.put("")
async def update_resume(id: int, current_user: User = Depends(get_current_user), file: UploadFile = File(...), resume_service: ResumeService = Depends()):
    return await resume_service.update_resume(id, current_user['id'], file)


@router.delete("")
async def delete_resume(id: int, current_user: User = Depends(get_current_user), resume_service: ResumeService = Depends()):
    return resume_service.delete_resume(id, current_user['id'])
