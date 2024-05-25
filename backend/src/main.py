from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from routers.AuthRouter import router as user_router
from routers.ResumeRouter import router as resume_router
from models.BaseModel import Base
from config.database import Engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
Base.metadata.create_all(bind=Engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(resume_router, prefix="/resumes", tags=["Resumes"])


def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


if __name__ == "__main__":
    run_migrations()
