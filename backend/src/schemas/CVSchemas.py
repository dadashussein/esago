from typing import Optional
from pydantic import BaseModel


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
        orm_mode = True
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