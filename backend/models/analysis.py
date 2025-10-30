"""
Analysis model for storing skill matching results and resume scores
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from .user import PyObjectId

class Analysis(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    resume_id: str
    job_description_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Analysis results
    overall_match: float  # This is the resume's score!
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    partial_matches: List[str] = []
    semantic_similarity: float = 0.0

    # Recommendations/suggestions
    recommendations: List[Dict[str, Any]] = []

    # Metadata
    analysis_version: str = "1.0"
    processing_time_seconds: Optional[float] = None

    # === Dashboard related ===
    resume_filename: Optional[str] = None  # Store file name for dashboard
    # You could add job title, summary, etc if needed for extra dashboard context

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "resume_id": "507f1f77bcf86cd799439012",
                "job_description_id": "507f1f77bcf86cd799439013",
                "overall_match": 75.5,
                "matched_skills": ["Python", "JavaScript"],
                "missing_skills": ["AWS", "Docker"],
                "recommendations": [],
                "resume_filename": "My_Resume.pdf"
            }
        }
