"""
User model for MongoDB (Pydantic v2 compatible)
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Any
from datetime import datetime
from bson import ObjectId



class PyObjectId(ObjectId):
    """Custom validator for MongoDB ObjectId."""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate


    @classmethod
    def validate(cls, v: Any):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)


    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        """Support for JSON schema in Pydantic v2."""
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema



class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    full_name: str
    hashed_password: str  # ADD THIS LINE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    is_active: bool = True
    resume_ids: List[str] = []
    analysis_ids: List[str] = []


    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "full_name": "John Doe",
                "hashed_password": "a_very_secure_hash_string", # Updated example
                "is_active": True
            }
        }
