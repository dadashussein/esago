from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user_id
from schemas.LanguageSchemas import LanguageCreate, LanguageUpdate
from services.LanguageService import LanguageService

router = APIRouter(dependencies=[Depends(JWTBearer())])
db_dependency = Annotated[Session, Depends()]

@router.get("/{language_id}")
def get_language_cv_by_id(language_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), languageService: LanguageService = Depends()):
    return languageService.get_language_cv_by_id(language_id, cv_id, user_id)

@router.get("")
def get_all_languages_cv(cv_id: int, user_id: int = Depends(get_current_user_id), languageService: LanguageService = Depends()):
    return languageService.get_all_languages_cv(cv_id, user_id)

@router.post("")
def create_language_cv(languageRequest: LanguageCreate, cv_id: int, user_id: int = Depends(get_current_user_id), languageService: LanguageService = Depends()):
    return languageService.create_language_cv(languageRequest, cv_id, user_id)

@router.put("")
def update_language_cv(languageRequest: LanguageUpdate, cv_id: int, user_id: int = Depends(get_current_user_id), languageService: LanguageService = Depends()):
    return languageService.update_language_cv(languageRequest, cv_id, user_id)

@router.delete("/{language_id}")
def delete_language_cv(language_id: int, cv_id: int, user_id: int = Depends(get_current_user_id), languageService: LanguageService = Depends()):
    return languageService.delete_language_cv(language_id, cv_id, user_id)
