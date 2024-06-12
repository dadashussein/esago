# main.py
import time
from fastapi import APIRouter, Depends, Response
from fastapi.responses import RedirectResponse
import requests
from authlib.integrations.starlette_client import OAuth
from pydantic import BaseModel
from starlette.config import Config
import os
from fastapi import FastAPI, Request
from fastapi_sso.sso.google import GoogleSSO
from config.config import configs
from schemas.UserSchemas import UserGoogleSchema
from services.UserService import UserService


oauth_router = APIRouter()

google_sso = GoogleSSO(
    client_id= configs.GOOGLE_CLIENT_ID,
    client_secret= configs.GOOGLE_CLIENT_SECRET,
    redirect_uri="http://localhost:8000/google/callback",
    allow_insecure_http=True,
)

class Gooogle(BaseModel):
    code: str


@oauth_router.get("/google/login")
async def google_login():
    with google_sso:
        return await google_sso.get_login_redirect(redirect_uri="http://localhost:8000/google/callback")

@oauth_router.get("/google/callback")
async def google_callback(request: Request, response:Response, user_service: UserService=Depends()):
    print(request.json())
    with google_sso:
        user = await google_sso.verify_and_process(request)
    if user:
        email = user.email
        picture_url = user.picture
        access_token = user_service.google_auth(email, picture_url)
        response.set_cookie(key="access_token", value=access_token['token'], samesite='strict')
        # todo frontend_google_uri must come from .env
        return RedirectResponse(url="http://localhost:5173/google/callback?access_token="+access_token['token'], status_code=308)
    raise Exception("User not found")   

@oauth_router.get("/read-cookie/")
async def read_cookie(request:Request, response:Response):
    return {"cookie_value": request.cookies.get("access_token")}
    