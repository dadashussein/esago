from typing import Optional
from pydantic import Field
from fastapi import File, Form, UploadFile
from pydantic import BaseModel


class CVSchema(BaseModel):
    id: int
    title: str
    first_name: str
    last_name: str
    address: str
    phone_number: str
    bio: str
    job_title: str
    picture: Optional[str]

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
    job_title: str


class CVUpdateSchema(BaseModel):
    id: int
    title: str
    first_name: str
    last_name: str
    address: str
    phone_number: str
    bio: str
    job_title: str