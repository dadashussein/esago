from typing import List
import uuid
from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user
from models.models import Education, User
from schemas.EducationSchemas import EducationCreate
from services.EducationService import EducationService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]


@router.get("")
def get_all_educations_user(user: User = Depends(get_current_user), education_service: EducationService = Depends()):
    return education_service.get_all_educations_user(user['id'])


@router.get("/{education_id}")
def get_education(education_id: int, user: User = Depends(get_current_user), education_service: EducationService = Depends()):
    return education_service.get_education(education_id)


@router.post("")
async def add_education(education: List[EducationCreate], user: User = Depends(get_current_user), education_service: EducationService = Depends()):
    for edu in education:
        await education_service.add_education(user['id'], edu)
    return {"message": "Educations added successfully"}


@router.put("/{education_id}")
def update_education(education_id: int, education: EducationCreate, user: User = Depends(get_current_user), education_service: EducationService = Depends()):
    return education_service.update_education(user['id'], education_id, education)


@router.delete("/{education_id}")
def delete_education(education_id: int, user: User = Depends(get_current_user), education_service: EducationService = Depends()):
    return education_service.delete_education(user['id'], education_id)
