"""
Database configuration and connection for synchronous MongoDB usage
"""
import os
from pymongo import MongoClient
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "skill_matcher_db")

try:
    client = MongoClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    # Test connection
    client.admin.command("ping")
    logger.info(f"Connected to MongoDB at {MONGODB_URL}")
except Exception as e:
    logger.error(f"Could not connect to MongoDB: {e}")
    raise

# Collections for easy import in your code
users_collection = db["users"]
resumes_collection = db["resumes"]
job_descriptions_collection = db["job_descriptions"]
analyses_collection = db["analyses"]
recommendations_collection = db["recommendations"]
