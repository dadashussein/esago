from models.models import Other
from repositories.OtherRepository import OtherRepository
from uuid import UUID
from schemas.OtherSchemas import OtherCreateSchema, OtherSchema, OtherUpdateSchema
from fastapi import HTTPException, status

class OtherService:
    
    def __init__(self, otherRepo: OtherRepository):
        self.otherRepo = otherRepo
    
    async def get_other_by_id(self, other_id: UUID, user_id: UUID):
        other = await self.otherRepo.get_other_by_id(other_id, user_id)
        if other is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Other not found")
        return OtherSchema.from_orm(other)
    
    async def get_all_others(self, user_id: UUID) :
        others = await self.otherRepo.get_all_others(user_id)
        return [OtherSchema.from_orm(other) for other in others]
    
    async def create_other(self, other: OtherCreateSchema, user_id: UUID):
        other_dict = other.dict()
        other_dict['user_id'] = user_id
        new_other = await self.otherRepo.create(other_dict)
        return {"message": "Other created successfully", "data": OtherSchema.from_orm(new_other)}
    
    async def update_other(self, other_data: OtherUpdateSchema, other_id: UUID, user_id: UUID) :
        other = await self.otherRepo.get_other_by_id(other_id, user_id)
        if other is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Other not found")
        other_dict = other_data.dict(exclude_unset=True)
        updated_other = await self.otherRepo.update(other_id, other_dict)
        return {"message": "Other updated successfully", "data": OtherSchema.from_orm(updated_other)}
    
    async def delete_other(self, other_id: UUID, user_id: UUID) :
        other = await self.otherRepo.get_other_by_id(other_id, user_id)
        if other is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Other not found")
        await self.otherRepo.delete(other_id)
        return {"message": "Other deleted successfully"}
