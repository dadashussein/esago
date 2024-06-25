from fastapi import Depends, HTTPException, status
from models.models import CV, Language
from repositories.LanguageRepository import LanguageRepository
from uuid import UUID
from schemas.LanguageSchemas import LanguageCreateSchema, LanguageSchema, LanguageUpdateSchema


class OtherService:
    