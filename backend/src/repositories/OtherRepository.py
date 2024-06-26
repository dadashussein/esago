from fastapi import Depends
from sqlalchemy.orm import Session
from uuid import UUID
from schemas.OtherSchemas import OtherItemField2Schema, OtherItemField3Schema, OtherItemFiledSchema
from config.database import get_db_connection
from models.models import CV, Other, OtherItem
from repositories.BaseRepository import BaseRepository


class OtherRepository(BaseRepository[Other, int]):
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        super().__init__(Other, db)

    def get_all_Others_cv(self, cv_id: int, user_id: UUID) -> list[Other]:
        return self.db.query(Other).join(CV).filter(
            Other.cv_id == cv_id,
            CV.user_id == user_id
        ).all()

    def get_Other_by_id(self, Other_id: int, cv_id: int, user_id: UUID) -> Other:
        return self.db.query(Other).join(CV).filter(
            Other.id == Other_id,
            Other.cv_id == cv_id,
            CV.user_id == user_id
        ).first()

    def create_other(self, name: str, cv_id: int, user_id: UUID) -> Other:
        cv = self.db.query(CV).filter(
            CV.id == cv_id,
            CV.user_id == user_id
        ).first()
        if cv is None:
            return None
        other = Other(cv=cv, name=name)
        self.db.add(other)
        self.db.commit()
        self.db.refresh(other)
        return other
    
    def create_other_item_field1(self, name: str, value: str, other_id: int, cv_id:int, user_id:UUID) -> Other:
        other = self.get_Other_by_id(other_id, cv_id, user_id)
        if other is None:
            return None
        other_item = OtherItem(name=name, value=value, other_id=other_id)
        self.db.add(other_item)
        self.db.commit()
        self.db.refresh(other_item)
        return other_item
    
    def create_other_item_field2(self, request: OtherItemField2Schema) -> Other:
        other_item = OtherItem(**request.model_dump())
        self.db.add(other_item)
        self.db.commit()
        self.db.refresh(other_item)
        return other_item
    
    def create_other_item_field3(self, request: OtherItemField3Schema) -> Other:
        other_item = OtherItem(**request.model_dump())
        self.db.add(other_item)
        self.db.commit()
        self.db.refresh(other_item)
        return other_item
    
    def get_other_item_by_id(self, other_item_id: int, cv_id:int, user_id: UUID) -> OtherItem:
        return self.db.query(OtherItem).join(Other).join(CV).filter(
            OtherItem.id == other_item_id,
            Other.cv_id == cv_id,
            CV.user_id == user_id
        ).first()
    
    def get_other_item_field1_by_id(self, other_item_id: int, user_id: UUID) -> OtherItem:
        return self.db.query(OtherItem).join(Other).join(CV).filter(
            OtherItem.id == other_item_id,
            Other.cv.user_id == user_id
        ).first()
    
    def get_other_by_id(self, other_id: int, cv_id:int, user_id: UUID) -> Other:
        return self.db.query(Other).join(CV).filter(
            Other.id == other_id,
            Other.cv_id == cv_id,
            CV.user_id == user_id
        ).first()
    
    def get_all_other_items_by_other_id(self, other_id: int, cv_id: int, user_id: UUID) -> list[OtherItem]:
        return self.db.query(OtherItem).join(Other).join(CV).filter(
            Other.id == other_id,
            Other.cv_id == cv_id,
            CV.user_id == user_id
        ).all()

    def delete_other(self, other_id: int,cv_id:int, user_id: UUID) -> Other:
        other = self.get_Other_by_id(other_id,cv_id, user_id)
        if other is None:
            return None
        self.db.delete(other)
        self.db.commit()
        return other
    
    def delete_other_item(self, other_item_id: int, cv_id:int, user_id: UUID) -> OtherItem:
        other_item = self.get_other_item_by_id(other_item_id,cv_id, user_id)
        if other_item is None:
            return None
        self.db.delete(other_item)
        self.db.commit()
        return other_item
    
    def delete_other_item_field1(self, other_item_id: int, user_id: UUID) -> OtherItem:
        other_item = self.get_other_item_field1_by_id(other_item_id, user_id)
        if other_item is None:
            return None
        self.db.delete(other_item)
        self.db.commit()
        return other_item
    
    def update_other_item(self, other_item_id: int, request: OtherItemFiledSchema,cv_id:int, user_id: UUID) -> OtherItem:
        other_item = self.get_other_item_by_id(other_item_id, cv_id, user_id)
        print(other_item_id, cv_id, user_id)
        if other_item is None:
            return None
        print("===========================")
        other_item.description = request.description
        other_item.name = request.name
        other_item.start_date = request.start_date
        other_item.end_date = request.end_date
        other_item.website = request.website
        other_item.field = request.field
        other_item.location = request.location
        other_item.value = request.value
        self.db.commit()
        self.db.refresh(other_item)
        return other_item