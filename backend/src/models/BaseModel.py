from sqlalchemy.ext.declarative import declarative_base
from config.database import Engine

# Base Entity Model Schema
Base = declarative_base()


def init():
    Base.metadata.create_all(bind=Engine)
