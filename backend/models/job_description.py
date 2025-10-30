"""
Job Description model for MongoDB
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from .user import PyObjectId

class JobDescription(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    title: str
    company: Optional[str] = None
    raw_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Parsed content
    extracted_skills: List[str] = []
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    experience_required: Dict[str, int] = {}

    # Metadata
    processing_status: str = "completed"
    error_message: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "title": "Senior Software Engineer",
                "company": "TechCorp",
                "extracted_skills": ["Python", "AWS", "Docker"],
                "required_skills": ["Python", "AWS"],
                "preferred_skills": ["Docker"]
            }
        }
