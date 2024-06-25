from pydantic import BaseModel
from typing import Optional


class OtherCreateSchema(BaseModel):
    name: Optional[str]
    description: Optional[str] 
    date: Optional[str]
    webstite: Optional[str]

class OtherUpdateSchema(BaseModel):
    id: int
    name: Optional[str]
    description: Optional[str] 
    date: Optional[str]
    webstite: Optional[str]

class OtherSchema(BaseModel):
    id: int
    name: Optional[str]
    description: Optional[str] 
    date: Optional[str]
    webstite: Optional[str]

    class Config:
        from_attributes = True