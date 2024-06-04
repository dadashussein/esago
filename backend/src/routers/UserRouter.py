import uuid
from fastapi import APIRouter, Depends, BackgroundTasks, File, UploadFile
from typing import Annotated

from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user, get_current_user_id
from models.models import User
from schemas.UserSchemas import UserRegisterSchema, UserLoginSchema
from services.UserService import UserService

router = APIRouter()
db_dependency = Annotated[Session, Depends()]


@router.post("/register")
async def register(user: UserRegisterSchema, background_tasks: BackgroundTasks, user_service: UserService = Depends()):
    return await user_service.register(user, background_tasks)


@router.post("/login")
async def login(user: UserLoginSchema, user_service: UserService = Depends()):
    return user_service.login(user)


@router.get("/activate/{user_id}")
async def activate_user(user_id: str, token: str, user_service: UserService = Depends()):
    return user_service.activate_user(user_id, token)


@router.patch("/changepicture", dependencies=[Depends(JWTBearer())])
async def change_picture(file: UploadFile = File(...), user_id: User = Depends(get_current_user_id),
                         user_service: UserService = Depends()):
    if not isinstance(user_id, uuid.UUID):
        user_id = uuid.UUID(user_id)
    return await user_service.change_profile_picture(user_id, file)


@router.get("/me", dependencies=[Depends(JWTBearer())])
async def get_me(user_id: User = Depends(get_current_user_id), user_service: UserService = Depends()):
    return user_service.get_me(user_id)
