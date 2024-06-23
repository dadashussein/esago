"""Skill Routers"""
from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from schemas.SkillSchemas import SkillCreateSchema, SkillUpdateSchema, SkillSchema
from services.SkillService import SkillService

router = APIRouter(dependencies=[Depends(JWTBearer())])

@router.get(
    "/{skill_id}",
    response_model=SkillSchema,
    status_code=status.HTTP_200_OK,
    summary="Get skill by ID",
)
def get_skill_cv_by_id(
    skill_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    skill_service: SkillService = Depends(),
):
    """
        Retrieve skill details by its ID if it's associated with the CV linked to your account.
    """
    return skill_service.get_skill_cv_by_id(skill_id, cv_id, user_id)

@router.get(
    "",
    response_model=list[SkillSchema],
    status_code=status.HTTP_200_OK,
    summary="Get all skills associated with a CV",
)
def get_all_skills_cv(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    skill_service: SkillService = Depends(),
):
    """
        Retrieve all skills associated with a CV linked to your account.
    """
    return skill_service.get_all_skills_cv(cv_id, user_id)

@router.post(
    "",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Create skill",
)
def create_skill_cv(
    skill_request: SkillCreateSchema,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    skill_service: SkillService = Depends(),
):
    """
        Create a new skill entry for a CV.
    """
    return skill_service.create_skill_cv(skill_request, cv_id, user_id)

@router.put(
    "",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Update skill",
)
def update_skill_cv(
    skill_request: SkillUpdateSchema,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    skill_service: SkillService = Depends(),
):
    """
        Update an existing skill entry in a CV.
    """
    return skill_service.update_skill_cv(skill_request, cv_id, user_id)

@router.delete(
    "/{skill_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Delete skill",
)
def delete_skill_cv(
    skill_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    skill_service: SkillService = Depends(),
):
    """
        Delete a skill entry from a CV.
    """
    return skill_service.delete_skill_cv(skill_id, cv_id, user_id)
