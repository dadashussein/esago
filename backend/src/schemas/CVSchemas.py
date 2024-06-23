from typing import Optional
from pydantic import BaseModel, Field
from schemas.ExperienceSchemas import ExperienceSchema
from schemas.ResumeSchema import ResumeSchema
from schemas.EducationSchemas import EducationSchema
from schemas.LanguageSchemas import LanguageSchema
from schemas.SkillSchemas import SkillSchema


class CVSchema(BaseModel):
    id: int
    title: str
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    picture: Optional[str]
    email: Optional[str]
    template_id: Optional[int]

    class Config:
        from_attributes=True

class CVAllSchema(BaseModel):
    id: int
    title: str
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    picture: Optional[str]
    email: Optional[str]
    template_id: Optional[int]

    education: Optional[list[EducationSchema]]
    experience: Optional[list[ExperienceSchema]]
    skill: Optional[list[SkillSchema]]
    language: Optional[list[LanguageSchema]]
    resume: Optional[list[ResumeSchema]]

    class Config:
        from_attributes=True

class CVCreateSchema(BaseModel):
    title: str = Field(..., example="My first cv")
    first_name: str = Field(..., example="John")
    last_name: str = Field(..., example="Doe")
    address: str = Field(..., example="1234 Elm St, Springfield, IL 62701")
    phone_number: str = Field(..., example="217-555-5555")
    bio: str = Field(..., example="I am a software engineer with 5 years of experience.")
    email: str = Field(..., example="example@example.com")
    job_title: str = Field(..., example="Software Engineer")
    template_id: int = Field(..., example=1)


class CVUpdateSchema(BaseModel):
    id: int = Field(..., example=1)
    title: Optional[str] = Field(None, example="My first cv")
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="Doe")
    address: Optional[str] = Field(None, example="1234 Elm St, Springfield, IL 62701")
    phone_number: Optional[str] = Field(None, example="217-555-5555")
    bio: Optional[str] = Field(None, example="I am a software engineer with 5 years of experience.")
    email: Optional[str] = Field(None, example="example2@example.com")
    job_title: Optional[str] = Field(None, example="Software Engineer")
    template_id: Optional[int] = Field(None, example=1)

class CVFirstSchema(BaseModel):
    title: str = Field(..., example="My first cv")