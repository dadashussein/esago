from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from schemas.OtherSchemas import OtherItemField2Schema, OtherItemField3Schema, OtherItemFiledSchema
from services.OtherService import OtherService
from config.security import JWTBearer, get_current_user_id

router = APIRouter()

@router.post("/create", response_model=dict)
async def create_other(name: str, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.create_other(name, cv_id, user_id)

@router.post("/create/item/field1", response_model=dict)
async def create_other_item_field1(name: str, value: str, cv_id, other_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.create_other_item_field_1(name, value, other_id, cv_id, user_id)

@router.post("/create/item/field2", response_model=dict)
async def create_other_item_field2(request: OtherItemField2Schema, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.create_other_item_field_2(request, cv_id, user_id)

@router.post("/create/item/field3", response_model=dict)
async def create_other_item_field3(request: OtherItemField3Schema, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.create_other_item_field_3(request, cv_id, user_id)

@router.get("/all")
async def get_all_others_cv(cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.get_all_others_cv(cv_id, user_id)

@router.get("/{other_id}")
async def get_other_by_id(cv_id: int, other_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.get_other_by_id(other_id, cv_id, user_id)

@router.get("/item/{other_item_id}")
async def get_other_item_by_id(other_item_id: int, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    datas = service.get_other_item_by_id(other_item_id, cv_id, user_id)
    return datas

@router.get("/item/field1/{other_item_id}")
async def get_other_item_field1_by_id(other_item_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.get_other_item_field1_by_id(other_item_id, user_id)

@router.get("/other/{other_id}/item/all")
async def get_all_other_items_by_other_id(other_id: int, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.get_all_other_items_by_other_id(other_id, cv_id, user_id)

@router.delete("/{other_id}")
async def delete_other(other_id: int, cv_id:int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.delete_other(other_id, cv_id,user_id)

@router.put("/{other_id}")
async def update_other_item(other_id: int, request: OtherItemFiledSchema, cv_id: int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.update_other_item(other_id, request, cv_id, user_id)

@router.delete("/item/{other_item_id}")
async def delete_other_item(other_item_id: int, cv_id:int, user_id: UUID = Depends(get_current_user_id), service: OtherService = Depends()):
    return service.delete_other_item(other_item_id, cv_id, user_id)