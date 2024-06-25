import uuid
import sqlalchemy
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from .BaseModel import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(sqlalchemy.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(sqlalchemy.String, unique=True)
    email = Column(sqlalchemy.String, unique=True)
    password = Column(sqlalchemy.String, nullable=True)
    is_active = Column(sqlalchemy.Boolean, default=False)
    is_google = Column(sqlalchemy.Boolean, default=False)
    profile_picture = Column(sqlalchemy.String, nullable=True, default=None)

    activation_code = Column(sqlalchemy.String, nullable=True, default=None)
    activation_expire = Column(sqlalchemy.DateTime, nullable=True, default=None)

    cvs = relationship('CV', back_populates='user', cascade="all, delete-orphan")

    def to_dict(self):
        data = {c.key: getattr(self, c.key) for c in sqlalchemy.inspect(self).mapper.column_attrs}
        data['id'] = str(self.id)  # Convert UUID to string
        return data


class CV(Base):
    __tablename__ = 'cvs'

    id = Column(sqlalchemy.Integer, primary_key=True)
    title = Column(sqlalchemy.String, nullable=True)
    created_at = Column(sqlalchemy.DateTime, default=sqlalchemy.func.now())
    updated_at = Column(sqlalchemy.DateTime, default=sqlalchemy.func.now(), onupdate=sqlalchemy.func.now())
    user_id = Column(ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='cvs')

    # User information
    first_name = Column(sqlalchemy.String, nullable=True, default=None)
    last_name = Column(sqlalchemy.String, nullable=True, default=None)
    address = Column(sqlalchemy.String, nullable=True, default=None)
    phone_number = Column(sqlalchemy.String, nullable=True, default=None)
    bio = Column(sqlalchemy.String, nullable=True, default=None)
    job_title = Column(sqlalchemy.String, nullable=True, default=None)
    email = Column(sqlalchemy.String, nullable=True, default=None)
    picture = Column(sqlalchemy.String, nullable=True, default=None)
    template_id = Column(sqlalchemy.Integer, nullable=True, default=1)

    educations = relationship('Education', back_populates='cv', cascade="all, delete-orphan")
    experiences = relationship('Experience', back_populates='cv', cascade="all, delete-orphan")
    skills = relationship('Skill', back_populates='cv', cascade="all, delete-orphan")
    languages = relationship('Language', back_populates='cv', cascade="all, delete-orphan")
    resumes = relationship('Resume', back_populates='cv', cascade="all, delete-orphan")
    # others = relationship('Other', back_populates='cv', cascade="all, delete-orphan")


class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(sqlalchemy.Integer, primary_key=True)
    path = Column(sqlalchemy.String, nullable=False)
    cv_id = Column(ForeignKey('cvs.id'))
    cv = relationship('CV', back_populates='resumes')


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
    cv_id = Column(ForeignKey('cvs.id'))
    cv = relationship('CV', back_populates='educations')


class Experience(Base):
    __tablename__ = 'experiences'

    id = Column(sqlalchemy.Integer, primary_key=True)
    job_title = Column(sqlalchemy.String)
    company_name = Column(sqlalchemy.String)
    location = Column(sqlalchemy.String)
    description = Column(sqlalchemy.String)
    start_date = Column(sqlalchemy.Date)
    end_date = Column(sqlalchemy.Date)
    cv_id = Column(ForeignKey('cvs.id'))
    cv = relationship('CV', back_populates='experiences')


class Skill(Base):
    __tablename__ = 'skills'

    id = Column(sqlalchemy.Integer, primary_key=True)
    name = Column(sqlalchemy.String)
    # level = Column(sqlalchemy.String, nullable=True)
    cv_id = Column(ForeignKey('cvs.id'))
    cv = relationship('CV', back_populates='skills')


class Language(Base):
    __tablename__ = 'languages'

    id = Column(sqlalchemy.Integer, primary_key=True)
    name = Column(sqlalchemy.String)
    proficiency = Column(sqlalchemy.String)
    cv_id = Column(ForeignKey('cvs.id'))
    cv = relationship('CV', back_populates='languages')


# class Other(Base):
#     __tablename__ = 'others'

#     id = Column(sqlalchemy.Integer, primary_key=True)
#     name= Column(sqlalchemy.String, nullable=False)
#     other_items = relationship('OtherItem', back_populates='other', cascade="all, delete-orphan")
#     cv_id = Column(ForeignKey('cvs.id'))
#     cv = relationship('CV', back_populates='others')


# class OtherItem(Base):
#     __tablename__ = 'other_items'

#     id = Column(sqlalchemy.Integer, primary_key=True)
#     name = Column(sqlalchemy.String)
#     description = Column(sqlalchemy.String)
#     date = Column(sqlalchemy.Date)
#     webstite = Column(sqlalchemy.String)

#     other_id = Column(ForeignKey('others.id'))
#     other = relationship('Other', back_populates='other_items')