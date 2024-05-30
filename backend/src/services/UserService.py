import uuid
from datetime import timedelta, datetime
from fastapi import Depends, HTTPException, status, BackgroundTasks
from pydantic import ValidationError

from services.FileService import FileService
from config.config import configs
from models.models import User
from repositories.UserRepository import UserRepository
from schemas.UserSchemas import UserRegisterSchema, UserLoginSchema, Payload, UserSchema, UserUpdateSchema
from config.security import get_password_hash, verify_password, create_access_token, decode_jwt
from config.security import JWTBearer
from services.EmailService import EmailService


class UserService:
    def __init__(self, userRepo: UserRepository = Depends(), emailService: EmailService = Depends()):
        self.userRepo = userRepo
        self.emailService = emailService

    def login(self, user: UserLoginSchema):
        db_user = self.userRepo.get_where(username=user.username_or_email) or self.userRepo.get_where(
            email=user.username_or_email)
        if db_user is None or not verify_password(user.password, db_user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
        if not db_user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account is not activated")

        delattr(db_user, "password")
        payload = Payload(id=str(db_user.id), email=db_user.email).dict()
        token_lifespan = timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expiration_datetime = create_access_token(payload, token_lifespan)

        sign_in_result = {
            "token": access_token,
            "expiration": expiration_datetime,
            "user": db_user
        }
        return sign_in_result

    def register(self, user: UserRegisterSchema, background_tasks: BackgroundTasks):
        if self.userRepo.get_where(username=user.username) or self.userRepo.get_where(email=user.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists")

        activation_token = str(uuid.uuid4())
        new_user = User(**user.dict(exclude_none=True), is_active=False, activation_token=activation_token,
                        activation_expire=datetime.now() + timedelta(minutes=5))
        new_user.password = get_password_hash(user.password)

        created_user = self.userRepo.create(new_user)
        activation_link = f"http://127.0.0.1:8000/users/activate/{created_user.id}?token={activation_token}"
        background_tasks.add_task(self.emailService.send_email, user.email, "Activate your account",
                                  f"Click on the link to activate your account: {activation_link}", True)
        delattr(created_user, "password")
        return created_user

    def activate_user(self, user_id: uuid.UUID, token: str):
        user = self.userRepo.get(user_id)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Something went wrong try again to register")
        if user.is_active:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account already activated")
        if user.activation_token != token:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
        if user.activation_expire < datetime.now():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token expired")
        updated_user = self.userRepo.update(user.id, {"is_active": True, "activation_token": None})
        delattr(updated_user, "password")
        return updated_user

    def get_current_user(self, token: str) -> User:
        payload = decode_jwt(token)
        if payload is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        user = self.userRepo.get_where(email=payload.get("email"))
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return user

    def get_me(self, userId: uuid.UUID):
        user = self.userRepo.get(userId)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

        try:
            user_schema = UserSchema(**user.to_dict())
        except ValidationError as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        return user_schema

    def get_all_resumes_user(self, userId: uuid.UUID):
        user = self.userRepo.get(userId)
        return user.resumes

    async def change_profile_picture(self, userId: uuid.UUID, file):
        user = self.userRepo.get(userId)
        filename = await FileService.upload(file, configs.UPLOAD_PROFILE_DIR)
        updated_user = self.userRepo.update(user.id, {"profile_picture": filename})
        delattr(updated_user, "password")
        return updated_user

    def update_user(self, user: UserUpdateSchema, userId: uuid.UUID):
        updated_user = self.userRepo.update(userId, user.dict(exclude_none=True))
        delattr(updated_user, "password")
        return updated_user
