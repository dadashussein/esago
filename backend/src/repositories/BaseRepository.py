from typing import Generic, Type, TypeVar
from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import Depends
from config.database import get_db_connection
from models.BaseModel import Base

ModelType = TypeVar('ModelType', bound=Base)
IdType = TypeVar('IdType', bound=UUID)


class BaseRepository(Generic[ModelType, IdType]):
    def __init__(self, model: Type[ModelType], db: Session = Depends(get_db_connection)) -> None:
        self.model = model
        self.db = db

    def get(self, id: Type[IdType]) -> ModelType:
        return self.db.query(self.model).filter_by(id=id).first()

    def get_all(self) -> list[ModelType]:
        return self.db.query(self.model).all()

    def get_where(self, **kwargs) -> ModelType:
        return self.db.query(self.model).filter_by(**kwargs).first()

    def create(self, obj: ModelType) -> ModelType:
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)

    def update(self, id: Type[IdType], updates: dict) -> ModelType:
        self.db.query(self.model).filter_by(id=id).update(updates)
        self.db.commit()
    
    def update_by(self, model: ModelType) -> ModelType:
        self.db.query(self.model).filter_by(id=model.id).update(model)
        self.db.commit()

    def delete(self, id: Type[IdType]) -> bool:
        obj = self.get(id)
        if obj:
            self.db.delete(obj)
            self.db.commit()
