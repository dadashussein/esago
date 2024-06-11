from fastapi import APIRouter, Depends, HTTPException, Response
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError
from config.config import configs
from schemas.UserSchemas import UserGoogleSchema
from services.UserService import UserService
from google.oauth2 import id_token 
from google.auth.transport import requests 

oauth_router = APIRouter()

config = Config('.env')
oauth = OAuth()

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
oauth.register(
    name='google',
    server_metadata_url=CONF_URL,
    client_id=config('GOOGLE_CLIENT_ID'),
    client_secret=config('GOOGLE_CLIENT_SECRET'),
    client_kwargs={
        'scope': 'openid email profile'
    }
)


@oauth_router.get("/auth") 
def authentication(request: Request,token:str, user_service: UserService = Depends()): 
    try: 
        # Specify the CLIENT_ID of the app that accesses the backend: 
        user =id_token.verify_oauth2_token(token, requests.Request(), config('GOOGLE_CLIENT_ID'))
        request.session['user'] = dict({ 
            "email" : user["email"]  
        })
        return user_service.google_auth(UserGoogleSchema(**user))
    except ValueError: 
        raise HTTPException(status_code=404, detail='Invalid Token')
  
@oauth_router.get('/') 
def check(request:Request): 
    return "hi "+ str(request.session.get('user')['email']) 