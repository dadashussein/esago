"""User Routers"""
import uuid
from fastapi import APIRouter, Depends, BackgroundTasks, File, UploadFile
from typing import Annotated
from sqlalchemy.orm import Session
from config.security import JWTBearer, get_current_user, get_current_user_id
from models.models import User
from schemas.UserSchemas import UserGoogleSchema, UserRegisterSchema, UserLoginSchema
from services.UserService import UserService

router = APIRouter()
db_dependency = Annotated[Session, Depends()]

@router.post(
    "/register",
    summary="Register a new user",
)
async def register(
    user: UserRegisterSchema,
    background_tasks: BackgroundTasks,
    user_service: UserService = Depends()
):
    """
        Register a new user and send an activation email.
    """
    return await user_service.register(user, background_tasks)

@router.post(
    "/login",
    summary="User login",
    response_model=dict
)
async def login(
    user: UserLoginSchema,
    user_service: UserService = Depends()
):
    """
        Authenticate a user and return a token.
    """
    return user_service.login(user)

@router.get(
    "/activate/{user_id}",
    summary="Activate a user account",
)
async def activate_user(
    user_id: str,
    code: str,
    user_service: UserService = Depends()
):
    """
        Activate a user account using the provided token.
    """
    return user_service.activate_user(user_id, code)

@router.patch(
    "/changepicture",
    dependencies=[Depends(JWTBearer())],
    summary="Change profile picture",
)
async def change_picture(
    file: UploadFile = File(...),
    user_id: User = Depends(get_current_user_id),
    user_service: UserService = Depends()
):
    """
        Change the profile picture of the current user.
    """
    if not isinstance(user_id, uuid.UUID):
        user_id = uuid.UUID(user_id)
    return await user_service.change_profile_picture(user_id, file)

@router.get(
    "/me",
    dependencies=[Depends(JWTBearer())],
    summary="Get current user details",
)
async def get_me(
    user_id: User = Depends(get_current_user_id),
    user_service: UserService = Depends()
):
    """
        Retrieve the current user's details.
    """
    return user_service.get_me(user_id)
