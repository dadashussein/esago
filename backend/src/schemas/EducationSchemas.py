from datetime import date

import sqlalchemy
from pydantic import BaseModel


class EducationCreate(BaseModel):
    school_name: str
    location: str
    description: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: date


class EducationUpdate(BaseModel):
    school_name: str
    location: str
    description: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: date
