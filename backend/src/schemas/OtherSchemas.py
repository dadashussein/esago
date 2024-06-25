from pydantic import BaseModel
from typing import Optional
from datetime import date

class OtherItemSchema(BaseModel):
    id: int
    other_id: int

class OtherItemField1Schema(BaseModel):
    name: str
    value: str
    other_item_id: int

class OtherItemFiledSchema(BaseModel):
    other_item_id: int
    name: Optional[str]
    value: Optional[str]
    location: Optional[str]
    description: Optional[str]
    field: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    website: Optional[str]

class OtherItemField2Schema(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    field: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    other_id: int

class OtherItemField3Schema(BaseModel):
    name: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    other_id: int
