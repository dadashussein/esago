from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from routers.UserRouter import router as user_router
from routers.CVRouter import router as cv_router
from routers.EducationRouter import router as education_router
from routers.ExperienceRouter import router as experience_router
from routers.SkillRouter import router as skill_router
from routers.LanguageRouter import router as language_router
from models.BaseModel import Base
from config.database import Engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
Base.metadata.create_all(bind=Engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5173",
    "http://127.0.0.1:4173",
]

# Mount the wwwroot directory
app.mount("/static", StaticFiles(directory="wwwroot"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(cv_router, prefix="/cvs", tags=["CVs"])
app.include_router(education_router, prefix="/educations/{cv_id}", tags=["Educations"])
app.include_router(experience_router, prefix="/experiences/{cv_id}", tags=["Experiences"])
app.include_router(skill_router, prefix="/skills/{cv_id}", tags=["Skills"])
app.include_router(language_router, prefix="/languages/{cv_id}", tags=["Languages"])


def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


if __name__ == "__main__":
    run_migrations()
