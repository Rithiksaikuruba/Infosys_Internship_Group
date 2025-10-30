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
from passlib.context import CryptContext
from pymongo.collection import Collection
from bson import ObjectId
from datetime import datetime
from typing import Optional

# Import the User model from your models directory
from models.user import User

# --- Security Setup ---
# Use passlib for hashing passwords. 'bcrypt' is a strong, widely-used hashing algorithm.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """
    This class contains all the business logic for user authentication.
    It handles password hashing, user creation, and user verification.
    """

    def __init__(self, user_collection: Collection):
        """
        Initializes the service with a MongoDB collection for users.
        """
        self.user_collection = user_collection

    # --- Password Hashing and Verification ---
    def hash_password(self, password: str) -> str:
        """Hashes a plain-text password using bcrypt."""
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verifies a plain-text password against a stored hash."""
        return pwd_context.verify(plain_password, hashed_password)

    # --- User Database Operations ---
    def create_user(self, email: str, full_name: str, password: str) -> Optional[User]:
        """
        Creates a new user, hashes their password, and saves them to the database.
        Returns the created user object or None if the user already exists.
        """
        # 1. Check if a user with this email already exists to prevent duplicates
        if self.user_collection.find_one({"email": email}):
            return None  # Indicates that the user already exists

        # 2. Hash the plain-text password for secure storage
        hashed_pwd = self.hash_password(password)

        # 3. Create a dictionary for the new user, conforming to your User model
        user_data = {
            "email": email,
            "full_name": full_name,
            "hashed_password": hashed_pwd,
            "created_at": datetime.utcnow(),
            "updated_at": None,
            "is_active": True,
            "resume_ids": [],
            "analysis_ids": []
        }

        # 4. Insert the new user into the MongoDB collection
        result = self.user_collection.insert_one(user_data)

        # 5. If insertion was successful, retrieve and return the new user as a Pydantic model
        if result.inserted_id:
            new_user_doc = self.user_collection.find_one({"_id": result.inserted_id})
            return User(**new_user_doc)
        
        return None

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticates a user by their email and password.
        Returns the user object if authentication is successful, otherwise returns None.
        """
        # 1. Find the user by email in the database
        user_doc = self.user_collection.find_one({"email": email})
        if not user_doc:
            return None # User not found

        # 2. Convert the MongoDB document to our Pydantic User model for easy access
        user = User(**user_doc)

        # 3. Securely verify the provided password against the stored hash
        if not self.verify_password(password, user.hashed_password):
            return None # Invalid password

        # 4. If the password is correct, return the complete user object
        return user
