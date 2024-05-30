import json
import uuid
from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: UUID
    username: str
    email: str
    first_name: str
    last_name: str
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    profile_picture: Optional[str]
    end_date: Optional[date]
    start_date: Optional[date]

    class Config:
        orm_mode = True
        from_attributes = True


class UserRegisterSchema(BaseModel):
    username: str
    email: str
    password: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True
        from_attributes = True


class UserLoginSchema(BaseModel):
    username_or_email: str
    password: str

    class Config:
        orm_mode = True
        from_attributes = True


class Payload(BaseModel):
    id: str
    email: str


class UserUpdateSchema(BaseModel):
    first_name: str
    last_name: str
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    profile_picture: Optional[str]
    end_date: Optional[date]
    start_date: Optional[date]