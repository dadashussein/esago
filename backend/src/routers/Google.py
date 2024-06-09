from fastapi import APIRouter, Depends, Response
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError
from config.config import configs
from schemas.UserSchemas import UserGoogleSchema
from services.UserService import UserService

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


@oauth_router.get('/login')
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)


@oauth_router.get('/auth')
async def auth(request: Request, response: Response, user_service: UserService = Depends()):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        return f"Error: {error}"
    user = token.get('userinfo')
    response = user_service.google_auth(UserGoogleSchema(email=user['email'], username=user['email']), response)
    return {'token': response['token']}


@oauth_router.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')