from msilib.schema import File
from uuid import UUID

from fastapi import UploadFile
from pydantic import BaseModel


class ResumeRequest(BaseModel):
    file: UploadFile
    user_id: UUID
