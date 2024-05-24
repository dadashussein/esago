from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from routers.AuthRouter import router as user_router
from routers.ResumeRouter import router as resume_router
from models.BaseModel import Base
from config.database import Engine

app = FastAPI()
Base.metadata.create_all(bind=Engine)

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(resume_router, prefix="/resumes", tags=["Resumes"])


def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


if __name__ == "__main__":
    run_migrations()
