from pydantic import BaseModel
from datetime import date
from typing import Optional

class ExperienceBase(BaseModel):
    job_title: Optional[str]
    company_name: Optional[str]
    location: Optional[str]
    description: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    
    class Config:
        
        from_attributes=True

class ExperienceCreate(ExperienceBase):
    job_title: str
    company_name: str
    start_date: date
    end_date: date

class ExperienceUpdate(ExperienceBase):
    id: int

class ExperienceSchema(ExperienceBase):
    id: int
    cv_id: int
        