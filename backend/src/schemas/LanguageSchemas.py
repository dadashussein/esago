from pydantic import BaseModel
from typing import Optional

class LanguageBase(BaseModel):
    name: Optional[str]
    proficiency: Optional[str]

class LanguageCreate(LanguageBase):
    name: str
    proficiency: str

class LanguageUpdate(LanguageBase):
    id: int

class LanguageSchema(LanguageBase):
    id: int
    cv_id: int

    class Config:
        orm_mode = True
        from_attributes = True