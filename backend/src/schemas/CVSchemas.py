from typing import Optional
from pydantic import BaseModel

from schemas.EducationSchemas import EducationSchema
from schemas.ExperienceSchemas import ExperienceSchema
from schemas.LanguageSchemas import LanguageSchema
from schemas.SkillSchemas import SkillSchema


class CVSchema(BaseModel):
    id: int
    title: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    picture: Optional[str]
    email: Optional[str]

    class Config:
        
        from_attributes=True

class CVSchemaAll(BaseModel):
    id: int
    title: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    picture: Optional[str]
    email: Optional[str]

    education: Optional[list[EducationSchema]]
    experience: Optional[list[ExperienceSchema]]
    skill: Optional[list[SkillSchema]]
    language: Optional[list[LanguageSchema]]

    class Config:
        
        from_attributes=True

class CVCreateSchema(BaseModel):
    title: str
    first_name: str
    last_name: str
    address: str
    phone_number: str
    bio: str
    email: str
    job_title: str


class CVUpdateSchema(BaseModel):
    id: int
    title: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    email: Optional[str]
    job_title: Optional[str]

class CVFirstSchema(BaseModel):
    title: str