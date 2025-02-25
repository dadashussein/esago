from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from config.config import configs


# Generate Database URL
DATABASE_URL = configs.DATABASE_URI

# Create Database Engine
Engine = create_engine(
    DATABASE_URL, future=True, pool_size=20, max_overflow=0
)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=Engine
)


def get_db_connection():
    db = scoped_session(SessionLocal)
    try:
        yield db
    finally:
        db.close()
