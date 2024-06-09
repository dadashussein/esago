from pydantic import BaseModel
from typing import Optional

class SkillBase(BaseModel):
    name: Optional[str]
    #level: Optional[str]

    class config:
        from_attributes = True

class SkillCreate(SkillBase):
    name: str
    #level: str

class SkillUpdate(SkillBase):
    id: int

class SkillSchema(SkillBase):
    id: int
    cv_id: int

    class Config:
        
        from_attributes = True
