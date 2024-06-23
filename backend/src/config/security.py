from datetime import datetime, timedelta
from http.client import HTTPException
from typing import Tuple

import bcrypt
from fastapi import Request, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from passlib.context import CryptContext
from config.config import configs
from config.exceptions import AuthError
from schemas.UserSchemas import Payload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"


def create_access_token(subject: Payload, expires_delta: timedelta = None) -> Tuple[str, str]:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)
    subject['exp'] = expire
    encoded_jwt = jwt.encode(subject, configs.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt"""
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check if the provided password matches the stored password (hashed)"""
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password=password_byte_enc, hashed_password=hashed_password_bytes)


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, configs.SECRET_KEY, algorithms=ALGORITHM)
        return decoded_token if decoded_token["exp"] >= int(round(datetime.utcnow().timestamp())) else None
    except Exception as e:
        return {}


# https://youtu.be/0_seNFCtglk?t=2830
class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise AuthError(detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise AuthError(detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise AuthError(detail="Invalid authorization code.")

    @staticmethod
    def verify_jwt(jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = decode_jwt(jwtoken)
        except Exception:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid


async def get_current_user(token: str = Depends(JWTBearer())):
    payload = decode_jwt(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    if payload['exp'] < int(round(datetime.utcnow().timestamp())):
        raise HTTPException(status_code=401, detail="Token has expired")
    return payload


async def get_current_user_id(token: str = Depends(JWTBearer())):
    payload = decode_jwt(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    if payload['exp'] < int(round(datetime.utcnow().timestamp())):
        raise HTTPException(status_code=401, detail="Token has expired")
    return payload['sub']