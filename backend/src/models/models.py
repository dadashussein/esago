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
    is_active = Column(sqlalchemy.Boolean, default=False)

    first_name = Column(sqlalchemy.String, nullable=True, default=None)
    last_name = Column(sqlalchemy.String, nullable=True, default=None)
    address = Column(sqlalchemy.String, nullable=True, default=None)
    phone_number = Column(sqlalchemy.String, nullable=True, default=None)
    bio = Column(sqlalchemy.String, nullable=True, default=None)
    job_title = Column(sqlalchemy.String, nullable=True, default=None)
    end_date = Column(sqlalchemy.Date, nullable=True, default=None)
    start_date = Column(sqlalchemy.Date, nullable=True, default=None)

    profile_picture = Column(sqlalchemy.String, nullable=True, default=None)

    activation_token = Column(sqlalchemy.String, nullable=True, default=None)
    activation_expire = Column(sqlalchemy.DateTime, nullable=True, default=None)

    resumes = sqlalchemy.orm.relationship('Resume', back_populates='user')
    educations = sqlalchemy.orm.relationship('Education', back_populates='user')

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in sqlalchemy.inspect(self).mapper.column_attrs}


class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(sqlalchemy.Integer, primary_key=True)
    path = Column(sqlalchemy.String)
    user_id = Column(sqlalchemy.ForeignKey('users.id'))
    user = sqlalchemy.orm.relationship('User', back_populates='resumes')


class Education(Base):
    __tablename__ = 'educations'

    id = Column(sqlalchemy.Integer, primary_key=True)
    school_name = Column(sqlalchemy.String)
    location = Column(sqlalchemy.String)
    description = Column(sqlalchemy.String)
    degree = Column(sqlalchemy.String)
    field_of_study = Column(sqlalchemy.String)
    start_date = Column(sqlalchemy.Date)
    end_date = Column(sqlalchemy.Date)
    user_id = Column(sqlalchemy.ForeignKey('users.id'))
    user = sqlalchemy.orm.relationship('User', back_populates='educations')
