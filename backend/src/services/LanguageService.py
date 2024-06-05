from fastapi import Depends, HTTPException, status
from models.models import CV, Language
from repositories.LanguageRepository import LanguageRepository
from uuid import UUID
from schemas.LanguageSchemas import LanguageCreate, LanguageSchema, LanguageUpdate

class LanguageService:

    def __init__(self, languageRepository: LanguageRepository = Depends()):
        self.languageRepo = languageRepository

    def get_all_languages_cv(self, cv_id: int, user_id: UUID) -> list[LanguageSchema]:
        languages = self.languageRepo.get_all_languages_cv(cv_id, user_id)
        return [LanguageSchema.from_orm(language) for language in languages]
    
    def get_language_cv_by_id(self, language_id: int, cv_id: int, user_id: UUID) -> LanguageSchema:
        language = self.languageRepo.get_language_by_id(language_id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        return LanguageSchema.from_orm(language)

    def create_language_cv(self, language_data: LanguageCreate, cv_id: int, user_id: UUID) -> LanguageSchema:
        language_data_dict = language_data.dict()
        language_data_dict['cv_id'] = cv_id
        language = Language(**language_data_dict)
        language = self.languageRepo.create(language)
        return LanguageSchema.from_orm(language)
    
    def update_language_cv(self, language_data: LanguageUpdate, cv_id: int, user_id: UUID) -> LanguageSchema:
        language = self.languageRepo.get_language_by_id(language_data.id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        language_data_dict = language_data.dict(exclude_unset=True)
        updated_language = self.languageRepo.update(language_data.id, language_data_dict)
        return LanguageSchema.from_orm(updated_language)
    
    def delete_language_cv(self, language_id: int, cv_id: int, user_id: UUID) -> LanguageSchema:
        language = self.languageRepo.get_language_by_id(language_id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        return self.languageRepo.delete(language_id)
