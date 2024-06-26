from datetime import date
from pydantic import BaseModel, Field
from typing import Optional

class EducationCreateSchema(BaseModel):
    school_name: str = Field(..., example="Harvard University")
    degree: str = Field(..., example="Bachelor of Science")
    field_of_study: str = Field(..., example="Computer Science")
    start_date: str = Field(..., example="2020-09-01")
    end_date: Optional[str] = Field(None, example="2024-05-31")
    description: Optional[str] = Field(None, example="Studied advanced algorithms and data structures.")
    location: Optional[str] = Field(None, example="Boston, MA")

class EducationUpdateSchema(BaseModel):
    id: int = Field(..., example=1)
    school_name: Optional[str] = Field(None, example="Harvard University")
    degree: Optional[str] = Field(None, example="Bachelor of Science")
    field_of_study: Optional[str] = Field(None, example="Computer Science")
    start_date: Optional[str] = Field(None, example="2020-09-01")
    end_date: Optional[str] = Field(None, example="2024-05-31")
    description: Optional[str] = Field(None, example="Studied advanced algorithms and data structures.")
    location: Optional[str] = Field(None, example="Boston, MA")

class EducationSchema(BaseModel):
    id: int
    school_name: Optional[str]
    degree: Optional[str]
    field_of_study: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    description: Optional[str]
    location: Optional[str]

    class Config:
        from_attributes = True