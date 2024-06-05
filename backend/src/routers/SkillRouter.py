from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from schemas.SkillSchemas import SkillCreate, SkillUpdate
from services.SkillService import SkillService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("/{skill_id}")
def get_skill_cv_by_id(skill_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), skillService: SkillService = Depends()):
    return skillService.get_skill_cv_by_id(skill_id, cv_id, user_id)

@router.get("")
def get_all_skills_cv(cv_id: int, user_id: int = Depends(get_current_user_id), skillService: SkillService = Depends()):
    return skillService.get_all_skills_cv(cv_id, user_id)

@router.post("")
def create_skill_cv(skillRequest: SkillCreate, cv_id: int, user_id: int = Depends(get_current_user_id), skillService: SkillService = Depends()):
    return skillService.create_skill_cv(skillRequest, cv_id, user_id)

@router.put("")
def update_skill_cv(skillRequest: SkillUpdate, cv_id: int, user_id: int = Depends(get_current_user_id), skillService: SkillService = Depends()):
    return skillService.update_skill_cv(skillRequest, cv_id, user_id)

@router.delete("/{skill_id}")
def delete_skill_cv(skill_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), skillService: SkillService = Depends()):
    return skillService.delete_skill_cv(skill_id, cv_id, user_id)
