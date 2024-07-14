from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class ExperienceSchema(BaseModel):
    job_title: Optional[str]
    company_name: Optional[str]
    location: Optional[str]
    description: Optional[str]
    start_date: date
    end_date: date
    id: int
    cv_id: int

    class Config:
        from_attributes=True

class ExperienceCreateSchema(BaseModel):
    job_title: Optional[str] = Field(..., example="Software Developer")
    company_name: Optional[str] = Field(..., example="Google")
    location: Optional[str] = Field(..., example="Mountain View, CA")
    description: Optional[str] = Field(..., example="Worked on the Google Search Engine")
    start_date: Optional[date] = Field(..., example="2020-01-01")
    end_date: Optional[date] = Field(..., example="2021-01-01")

class ExperienceUpdateSchema(BaseModel):
    id: int = Field(..., example=1)
    job_title: Optional[str] = Field(..., example="Software Developer")
    company_name: Optional[str] = Field(..., example="Google")
    location: Optional[str] = Field(..., example="Mountain View, CA")
    description: Optional[str] = Field(..., example="Worked on the Google Search Engine")
    start_date: Optional[date] = Field(..., example="2020-01-01")
    end_date: Optional[date] = Field(..., example="2021-01-01")