"""
Resume model for MongoDB
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from .user import PyObjectId

class Resume(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    filename: str
    file_size: int
    file_type: str  # 'pdf' or 'docx'
    upload_date: datetime = Field(default_factory=datetime.utcnow)

    # Parsed content
    raw_text: str
    extracted_skills: List[str] = []
    contact_info: Dict[str, Any] = {}
    experience_years: int = 0

    # Metadata
    processing_status: str = "completed"  # pending, processing, completed, failed
    error_message: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "filename": "resume.pdf",
                "file_size": 245760,
                "file_type": "pdf",
                "extracted_skills": ["Python", "JavaScript", "React"],
                "experience_years": 3
            }
        }
