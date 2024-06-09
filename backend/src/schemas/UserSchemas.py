import json
import uuid
from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, constr


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
        from_attributes = True


class UserRegisterSchema(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=8)
        


class UserGoogleSchema(BaseModel):
    username: str
    email: EmailStr
    class Config:
        from_attributes = True


class UserLoginSchema(BaseModel):
    username_or_email: str
    password: str

        


class Payload(BaseModel):
    sub: str
    email: str



class UserSchema(BaseModel):
    username: str
    profile_picture: Optional[str] = None
    email: str

    class Config:
        from_attributes=True

