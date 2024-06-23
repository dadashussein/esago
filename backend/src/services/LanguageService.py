from fastapi import Depends, HTTPException, status
from models.models import CV, Language
from repositories.LanguageRepository import LanguageRepository
from uuid import UUID
from schemas.LanguageSchemas import LanguageCreateSchema, LanguageSchema, LanguageUpdateSchema

class LanguageService:

    def __init__(self, languageRepository: LanguageRepository = Depends()):
        self.languageRepo = languageRepository

    def get_all_languages_cv(self, cv_id: int, user_id: UUID) -> list[LanguageSchema]:
        languages = self.languageRepo.get_all_languages_cv(cv_id, user_id)
        return [LanguageSchema.model_validate(language) for language in languages]
    
    def get_language_cv_by_id(self, language_id: int, cv_id: int, user_id: UUID) -> LanguageSchema:
        language = self.languageRepo.get_language_by_id(language_id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        return LanguageSchema.model_validate(language)

    def create_language_cv(self, language_data: LanguageCreateSchema, cv_id: int, user_id: UUID) -> dict:
        language_data_dict = language_data.model_dump()
        language_data_dict['cv_id'] = cv_id
        language = Language(**language_data_dict)
        self.languageRepo.create(language)
        return { "message": "Language created successfully" }
    
    def update_language_cv(self, language_data: LanguageUpdateSchema, cv_id: int, user_id: UUID) -> dict:
        language = self.languageRepo.get_language_by_id(language_data.id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        language_data_dict = language_data.dict(exclude_unset=True)
        self.languageRepo.update(language_data.id, language_data_dict)
        return { "message": "Language updated successfully" }
    
    def delete_language_cv(self, language_id: int, cv_id: int, user_id: UUID) -> dict:
        language = self.languageRepo.get_language_by_id(language_id, cv_id, user_id)
        if language is None:
            raise HTTPException(status_code=404, detail="Language not found")
        self.languageRepo.delete(language_id)
        return { "message": "Language deleted successfully" }
