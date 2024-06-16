from pydantic import BaseModel


class ResumeSchema(BaseModel):
    path: str

    class Config:
        from_attributes=True