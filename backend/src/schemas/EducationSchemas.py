from datetime import date
from pydantic import BaseModel


class EducationCreate(BaseModel):
    school_name: str
    location: str
    description: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: date

    class Config:
        orm_mode = True
        from_attributes=True

class EducationUpdate(BaseModel):
    id: int
    school_name: str
    location: str
    description: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: date

    class Config:
        orm_mode = True
        from_attributes=True

class EducationSchema(EducationCreate):
    id: int
    school_name: str
    location: str
    description: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: date

    class Config:
        orm_mode = True
        from_attributes=True
        
