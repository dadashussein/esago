"""Language routers"""
from fastapi import APIRouter, Depends, status
from config.security import JWTBearer, get_current_user_id
from schemas.LanguageSchemas import  LanguageCreateSchema, LanguageUpdateSchema, LanguageSchema
from services.LanguageService import LanguageService


router = APIRouter(dependencies=[Depends(JWTBearer())])


@router.get(
    "/{language_id}",
    response_model=LanguageSchema,
    status_code=status.HTTP_200_OK,
    summary="Get language by ID",
)
def get_language_cv_by_id(
    language_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    language_service: LanguageService = Depends(),
):
    """
    Retrieve language details by its ID if it's associated with the CV linked to your account.
    """
    return language_service.get_language_cv_by_id(language_id, cv_id, user_id)

@router.get(
    "",
    response_model=list[LanguageSchema],
    status_code=status.HTTP_200_OK,
    summary="Get all languages associated with a CV",
)
def get_all_languages_cv(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    language_service: LanguageService = Depends(),
):
    """
    Retrieve all languages associated with a CV linked to your account.
    """
    return language_service.get_all_languages_cv(cv_id, user_id)

@router.post(
    "",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Create language",
)
def create_language_cv(
    language_request: LanguageCreateSchema,
    cv_id: int,
    user_id: str = Depends(get_current_user_id),
    language_service: LanguageService = Depends(),
):
    """
    Create a new language entry for a CV.
    """
    return language_service.create_language_cv(language_request, cv_id, user_id)

@router.put(
    "",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Update language",
)
def update_language_cv(
    language_request: LanguageUpdateSchema,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    language_service: LanguageService = Depends(),
):
    """
    Update an existing language entry in a CV.
    """
    return language_service.update_language_cv(language_request, cv_id, user_id)

@router.delete(
    "/{language_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Delete language",
)
def delete_language_cv(
    language_id: int,
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    language_service: LanguageService = Depends(),
):
    """
    Delete a language entry from a CV.
    """
    return language_service.delete_language_cv(language_id, cv_id, user_id)
