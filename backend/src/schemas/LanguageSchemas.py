from pydantic import BaseModel
from typing import Optional


class LanguageCreateSchema(BaseModel):
    name: Optional[str]
    proficiency: Optional[str]

class LanguageUpdateSchema(BaseModel):
    id: int
    name: Optional[str]
    proficiency: Optional[str]

class LanguageSchema(BaseModel):
    id: int
    cv_id: int
    name: str
    proficiency: str

    class Config:
        from_attributes = True