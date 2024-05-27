import os
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

ENV: str = ""


class Configs(BaseSettings):
    # base

    ENV: str = os.getenv("ENV", "dev")
    API: str = "/api"
    PROJECT_NAME: str = "esago"
    UPLOAD_RESUME_DIR: Path = Path("wwwroot/resumes")
    UPLOAD_PROFILE_DIR: Path = Path("wwwroot/profiles")
    PROJECT_ROOT: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    # auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30  # 60 minutes * 24 hours * 30 days = 30 days
    DATETIME_FORMAT: str = "%Y-%m-%dT%H:%M:%S"
    BACKEND_CORS_ORIGINS: List[str] = ["http://locahost:3000", "https://locahost:3000"]

    # database
    DB: str = os.getenv("DB", "postgresql")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT", "3306")
    DB_ENGINE: str = os.getenv("DB_ENGINE", "postgresql")
    DB_DATABASE: str = os.getenv("DB_DATABASE")

    # email
    EMAIL_USERNAME: str = os.getenv("EMAIL_USERNAME")
    EMAIL_PASSWORD: str = os.getenv("EMAIL_PASSWORD")
    EMAIL_HOST: str = os.getenv("EMAIL_HOST")
    EMAIL_PORT: str = os.getenv("EMAIL_PORT")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM")
    EMAIL_TLS: bool = os.getenv("EMAIL_TLS", "true").lower() == "true"

    DATABASE_URI_FORMAT: str = "{db_engine}://{user}:{password}@{host}:{port}/{database}"

    DATABASE_URI: str = "{db_engine}://{user}:{password}@{host}:{port}/{database}".format(
        db_engine=DB_ENGINE,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_DATABASE,
    )

    # find query
    PAGE: int = 1
    PAGE_SIZE: int = 20
    ORDERING: str = "-id"

    class Config:
        case_sensitive = True


configs = Configs()
