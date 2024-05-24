from datetime import datetime, timedelta
from http.client import HTTPException

from fastapi import Request, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from passlib.context import CryptContext

from config.config import configs
from config.exceptions import AuthError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"


def create_access_token(subject: dict, expires_delta: timedelta = None) -> (str, str):
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"exp": expire, **subject}
    encoded_jwt = jwt.encode(payload, configs.SECRET_KEY, algorithm=ALGORITHM)
    expiration_datetime = expire.strftime(configs.DATETIME_FORMAT)
    return encoded_jwt, expiration_datetime


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


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
    return payload
