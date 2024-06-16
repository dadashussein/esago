from pydantic import BaseModel
from typing import Optional


class SkillCreateSchema(BaseModel):
    name: Optional[str]

class SkillUpdateSchema(BaseModel):
    id: int
    name: Optional[str]

class SkillSchema(BaseModel):
    id: int
    cv_id: int
    name: Optional[str]

    class Config:
        from_attributes = True
