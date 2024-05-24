import uuid
import sqlalchemy
from sqlalchemy import Column
from models.BaseModel import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(sqlalchemy.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(sqlalchemy.String, unique=True)
    email = Column(sqlalchemy.String, unique=True)
    password = Column(sqlalchemy.String)
    full_name = Column(sqlalchemy.String)
    is_active = Column(sqlalchemy.Boolean, default=False)
    activation_token = Column(sqlalchemy.String, nullable=True, default=None)
    activation_expire = Column(sqlalchemy.DateTime, nullable=True, default=None)
    resumes = sqlalchemy.orm.relationship('Resume', back_populates='user')


class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(sqlalchemy.Integer, primary_key=True)
    path = Column(sqlalchemy.String)
    user_id = Column(sqlalchemy.ForeignKey('users.id'))
    user = sqlalchemy.orm.relationship('User', back_populates='resumes')
