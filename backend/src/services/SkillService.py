from fastapi import Depends, HTTPException, status
from services.CVService import CVService
from models.models import CV, Skill
from repositories.SkillRepository import SkillRepository
from uuid import UUID
from schemas.SkillSchemas import SkillCreateSchema, SkillSchema, SkillUpdateSchema

class SkillService:

    def __init__(self, skillRepository: SkillRepository = Depends(), cvService: CVService = Depends()):
        self.skillRepo = skillRepository
        self.cvService = cvService

    def get_all_skills_cv(self, cv_id: int, user_id: UUID) -> list[SkillSchema]:
        skills = self.skillRepo.get_all_skills_cv(cv_id, user_id)
        return [SkillSchema.model_validate(skill) for skill in skills]
    
    def get_skill_cv_by_id(self, skill_id: int, cv_id: int, user_id: UUID) -> SkillSchema:
        skill = self.skillRepo.get_skill_by_id(skill_id, cv_id, user_id)
        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")
        return SkillSchema.model_validate(skill)

    def create_skill_cv(self, skill_data: SkillCreateSchema, cv_id: int, user_id: UUID) -> dict:
        skill_data_dict = skill_data.model_dump()
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        skill_data_dict['cv_id'] = cv_id
        skill = Skill(**skill_data_dict)
        self.skillRepo.create(skill)
        skill_json = {
            "id": skill.id,
            "name": skill.name,
            "cv_id": skill.cv_id
        }
        return { 
                 "message": "Skill created successfully",
                 "data": skill_json
               }
    
    def update_skill_cv(self, skill_data: SkillUpdateSchema, cv_id: int, user_id: UUID) -> dict:
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        skill = self.skillRepo.get_skill_by_id(skill_data.id, cv_id, user_id)
        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")
        skill_data_dict = skill_data.dict(exclude_unset=True)
        self.skillRepo.update(skill_data.id, skill_data_dict)
        return { "message": "Skill updated successfully" }
    
    def delete_skill_cv(self, skill_id: int, cv_id: int, user_id: UUID) -> dict:
        cv = self.cvService.get_cv_by_id(cv_id, user_id)
        if cv is None:
            raise HTTPException(status_code=404, detail="CV not found")
        skill = self.skillRepo.get_skill_by_id(skill_id, cv_id, user_id)
        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")
        self.skillRepo.delete(skill_id)
        return { "message": "Skill deleted successfully"}
