"""Education routers"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from schemas.EducationSchemas import EducationCreate, EducationUpdate, EducationSchema
from services.EducationService import EducationService


router = APIRouter(dependencies=[Depends(JWTBearer())])


@router.get(
    "/{education_id}",
    response_model=EducationSchema,
    status_code=status.HTTP_200_OK,
    summary="Get education by ID",
)
def get_education_cv_by_id(
    education_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    education_service: EducationService = Depends(),
):
    """
    Get education details by its ID. And alse you will get the education if it is associated with the CV and this CV is associated with your account.
    """
    return education_service.get_education_cv_by_id(education_id, cv_id, Depends(get_current_user_id))

@router.get(
    "",
    response_model=list[EducationSchema],
    status_code=status.HTTP_200_OK,
    summary="Get all educations associated with a CV which is associated with your account.",
)
def get_all_educations_cv(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    education_service: EducationService = Depends(),
):
    """
    Get all educations associated with a CV. And also you will get the educations if they are associated with the CV and this CV is associated with your account.
    """
    return education_service.get_all_educations_cv(cv_id, user_id)

@router.post(
    "",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Create education",
)
def create_education_cv(
    education_request: EducationCreate,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    education_service: EducationService = Depends(),
):
    """
    Create a new education entry for a CV.
    """
    return education_service.create_education_cv(education_request, cv_id, user_id)

@router.put(
    "",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Update education",
)
def update_education_cv(
    education_request: EducationUpdate,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    education_service: EducationService = Depends(),
):
    """
    Update an existing education entry in a CV.
    """
    return education_service.update_education_cv(education_request, cv_id, user_id)

@router.delete(
    "/{education_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Delete education",
)
def delete_education_cv(
    education_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    education_service: EducationService = Depends(),
):
    """
    Delete an education entry from a CV.
    """
    return education_service.delete_education_cv(education_id, cv_id, user_id)
