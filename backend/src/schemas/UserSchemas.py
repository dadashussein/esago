import json
import uuid
from uuid import UUID

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: UUID
    full_name: str
    username: str
    email: str

    class Config:
        orm_mode = True
        from_attributes = True


class UserRegisterSchema(BaseModel):
    username: str
    email: str
    password: str
    full_name: str

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
