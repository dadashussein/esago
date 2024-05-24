from fastapi import APIRouter, Depends, BackgroundTasks
from typing import Annotated

from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from schemas.UserSchemas import  UserRegisterSchema, UserLoginSchema
from services.UserService import UserService

router = APIRouter()
db_dependency = Annotated[Session, Depends()]


@router.post("/register")
def register(user: UserRegisterSchema, background_tasks: BackgroundTasks, user_service: UserService = Depends()):
    return user_service.register(user, background_tasks)


@router.post("/login")
async def login(user: UserLoginSchema, user_service: UserService = Depends()):
    return user_service.login(user)


@router.get("/activate/{user_id}")
async def activate_user(user_id: str, token: str, user_service: UserService = Depends()):
    return user_service.activate_user(user_id, token)
