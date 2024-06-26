from typing import List
from uuid import UUID
from fastapi import Depends, HTTPException
from schemas.OtherSchemas import OtherItemField2Schema, OtherItemField3Schema, OtherItemFiledSchema
from config.security import get_current_user_id
from services.CVService import CVService
from models.models import Other
from repositories.OtherRepository import OtherRepository

class OtherService:
    def __init__(self, otherRepo: OtherRepository = Depends(), cvService: CVService = Depends()):
        self.otherRepo = otherRepo
        self.cvService = cvService

    def create_other(self, name:str, cv_id:int, user_id:UUID):
        other = self.otherRepo.create_other(name, cv_id, user_id)
        if other is None:
            raise HTTPException(status_code=404, detail="CV not found")
        return { "message": "Other created successfully", "data": other.id }
    
    def create_other_item_field_1(self, name:str, value:str, other_item_id:int, cv_id:int, user_id:UUID):
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        other_item = self.otherRepo.create_other_item_field1(name, value, other_item_id, cv_id, user_id)
        if other_item is None:
            raise HTTPException(status_code=404, detail="Other item not found")
        return { "message": "Other item created successfully", "data": other_item.id }
    
    def create_other_item_field_2(self, request: OtherItemField2Schema, cv_id: int, user_id: UUID):
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        other_item = self.otherRepo.create_other_item_field2(request)
        return { "message": "Other item created successfully", "data": other_item.id }
    
    def create_other_item_field_3(self, request: OtherItemField3Schema, cv_id: int, user_id: UUID):
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        other_item = self.otherRepo.create_other_item_field3(request)
        return { "message": "Other item created successfully", "data": other_item.id }
    
    def get_all_others_cv(self, cv_id: int, user_id: UUID):
        others = self.otherRepo.get_all_Others_cv(cv_id, user_id)
        return { "data": others }
    
    def get_other_by_id(self, other_id: int, cv_id: int, user_id: UUID ):
        other = self.otherRepo.get_other_by_id(other_id, cv_id, user_id)
        if other is None:
            raise HTTPException(status_code=404, detail="Other not found")
        return { "data": other }
    
    def get_other_item_by_id(self, other_item_id: int, cv_id:int,  user_id: UUID):
        other_item = self.otherRepo.get_other_item_by_id(other_item_id, cv_id, user_id)
        if other_item is None:
            raise HTTPException(status_code=404, detail="Other item not found")
        return other_item 
    
    def get_all_other_items_by_other_id(self, other_id: int, cv_id: int, user_id: UUID):
        other_items = self.otherRepo.get_all_other_items_by_other_id(other_id, cv_id, user_id)
        
        return { "data": other_items }

    def delete_other(self, other_id: int, cv_id:int, user_id: UUID):
        other = self.otherRepo.delete_other(other_id, cv_id, user_id)
        if other is None:
            raise HTTPException(status_code=404, detail="Other item not found")
        return { "message": "Other deleted successfully", "data": other.id }
    
    def delete_other_item(self, other_item_id: int,cv_id:int, user_id: UUID):
        other_item = self.otherRepo.delete_other_item(other_item_id,cv_id, user_id)
        if other_item is None:
            raise HTTPException(status_code=404, detail="Other item not found")
        return { "message": "Other item deleted successfully", "data": other_item.id }
    
    def update_other_item(self, other_id: int, request: OtherItemFiledSchema, cv_id:int, user_id: UUID):
        other_item = self.otherRepo.update_other_item(other_id, request, cv_id, user_id)
        if other_item is None:
            raise HTTPException(status_code=404, detail="Other item not found")
        return { "message": "Other item updated successfully", "data": other_item.id }