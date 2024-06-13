# main.py
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi_sso.sso.google import GoogleSSO
from config.config import configs
from schemas.UserSchemas import UserGoogleSchema
from services.UserService import UserService


oauth_router = APIRouter()

google_sso = GoogleSSO(
    client_id= configs.GOOGLE_CLIENT_ID,
    client_secret= configs.GOOGLE_CLIENT_SECRET,
    redirect_uri=f"{configs.BACKEND_URI}/google/callback",
    allow_insecure_http=True,
)

class Gooogle(BaseModel):
    code: str


@oauth_router.get("/google/login")
async def google_login():
    with google_sso:
        return await google_sso.get_login_redirect(redirect_uri=google_sso.redirect_uri)

@oauth_router.get("/google/callback")
async def google_callback(request: Request, response:Response, user_service: UserService=Depends()):
    print(request.json())
    with google_sso:
        user = await google_sso.verify_and_process(request)
    if user:
        access_token = user_service.google_auth(user.email, user.picture)
        # todo frontend_google_uri must come from .env
        response.set_cookie(key="salam", value=access_token['token'])
        return RedirectResponse(url=f"{configs.FRONTEND_URI}/google/callback?access_token="+access_token['token'], status_code=308)
    raise HTTPException(status_code=404, detail="User not found")
