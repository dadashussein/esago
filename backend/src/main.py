from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from routers.UserRouter import router as user_router
from routers.CVRouter import router as cv_router
from routers.EducationRouter import router as education_router
from routers.ExperienceRouter import router as experience_router
from routers.SkillRouter import router as skill_router
from routers.LanguageRouter import router as language_router
from routers.ResumeRouter import router as resume_router
from routers.OtherRouter import router as other_router
from routers.Google import oauth_router
from models.BaseModel import Base
from config.database import Engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from config.config import configs
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
import sentry_sdk

sentry_sdk.init(
    dsn="https://9172fadef5922b4a1c64eeae4b6b3aba@o4507573150416896.ingest.de.sentry.io/4507573157691472",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)
app = FastAPI()

@app.get("/sentry-debug")
async def trigger_error():
    division_by_zero = 1 / 0

Base.metadata.create_all(bind=Engine)
origins = [
    configs.FRONTEND_URI,
    configs.BACKEND_URI
]

# Mount the wwwroot directory
app.mount("/static", StaticFiles(directory="wwwroot"), name="static")
app.add_middleware(SessionMiddleware, secret_key="!secret")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(cv_router, prefix="/cvs", tags=["CVs"])
app.include_router(education_router, prefix="/educations/{cv_id}", tags=["Educations"])
app.include_router(experience_router, prefix="/experiences/{cv_id}", tags=["Experiences"])
app.include_router(skill_router, prefix="/skills/{cv_id}", tags=["Skills"])
app.include_router(language_router, prefix="/languages/{cv_id}", tags=["Languages"])
app.include_router(oauth_router, prefix="", tags=["Google"])
app.include_router(resume_router , prefix="/resumes/{cv_id}", tags=["Resume"])
app.include_router(other_router, prefix="/others/{cv_id}", tags=["Others"])

def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


if __name__ == "__main__":
    run_migrations()
