"""
FastAPI Backend for Resume Skill Matching + Mock Interview
NLP-powered skill extraction, matching, and mock interview service
"""

from datetime import datetime
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Dict
import uvicorn
import logging
import os
from dotenv import load_dotenv

from pymongo import MongoClient
from passlib.hash import bcrypt

from services.resume_parser import ResumeParser
from services.job_parser import JobDescriptionParser
from services.skill_matcher import SkillMatcher
from services.recommender import SkillRecommender

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Resume Skill Matcher API",
    description="NLP-powered resume, job skill-matching, and mock interview service",
    version="1.0.0"
)

# Mongo + env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["skill_matcher_db"]
users_collection = db["users"]
analyses_collection = db["analyses"]  # used by resume scores

# CORS - explicit origins when using credentials
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",  # if you use alternate ports
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Auth ------------------
class SignupData(BaseModel):
    fullname: str
    email: EmailStr
    password: str

class LoginData(BaseModel):
    email: EmailStr
    password: str

@app.post("/api/signup")
async def signup(user: SignupData):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    try:
        hashed_password = bcrypt.hash(user.password)
        users_collection.insert_one({
            "fullname": user.fullname,
            "email": user.email,
            "password": hashed_password
        })
    except Exception as e:
        logger.error(f"Error inserting user to DB: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    return {"message": "User registered successfully", "fullname": user.fullname, "email": user.email}

@app.post("/api/register")
async def register(user: SignupData):
    return await signup(user)

@app.post("/api/login")
async def login(user: LoginData):
    record = users_collection.find_one({"email": user.email})
    if not record or not bcrypt.verify(user.password, record["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "message": "Login successful",
        "fullname": record.get("fullname") or record.get("full_name") or "",
        "email": record["email"],
        "user_id": str(record["_id"])
    }

# ---------- Resume scores endpoint ----------
@app.get("/api/users/{user_id}/resume-scores")
async def get_resume_scores(user_id: str):
    logger.info(f"Fetching analyses for user_id: {user_id}")
    # Most recent first using created_at
    scores_cursor = analyses_collection.find({"user_id": str(user_id)}).sort("created_at", -1)
    scores = []
    for s in scores_cursor:
        scores.append({
            "id": str(s.get("_id")),
            "filename": s.get("resume_filename", "Unknown"),
            "score": s.get("overall_match"),
            "date": s.get("created_at"),
        })
    return scores

# ------------------ Services ------------------
try:
    logger.info("Initializing services ...")
    resume_parser = ResumeParser()
    job_parser = JobDescriptionParser()
    skill_matcher = SkillMatcher()
    skill_recommender = SkillRecommender()
    logger.info("All services initialized ✅")
except Exception as e:
    logger.error("Service initialization failed: %s", e, exc_info=True)
    raise

# ------------------ Models for parsing/matching ------------------
class JobDescriptionRequest(BaseModel):
    text: str

class SkillMatchRequest(BaseModel):
    resume_skills: List[str]
    job_skills: List[str]

class SkillMatchResponse(BaseModel):
    overall_match: float
    matched_skills: List[str]
    missing_skills: List[str]
    partial_matches: List[str]
    recommendations: List[Dict]

# ------------------ Core endpoints ------------------
@app.get("/")
async def root():
    return {"message": "Resume Skill Matcher API", "status": "running"}

@app.post("/api/parse_resume")
async def parse_resume(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith((".pdf", ".docx", ".doc")):
            raise HTTPException(status_code=400, detail="Only PDF / DOCX files are supported")
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Empty resume file uploaded")
        result = resume_parser.parse(content, file.filename)
        return {
            "filename": file.filename,
            "text": result["text"],
            "skills": result["skills"],
            "metadata": result["metadata"],
        }
    except Exception as e:
        logger.error("Error parsing resume: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error parsing resume: {e}")

@app.post("/api/parse_job_description")
async def parse_job_description(request: JobDescriptionRequest):
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Job description text is required")
        result = job_parser.extract_skills(request.text)
        return {
            "text": request.text,
            "skills": result["skills"],
            "requirements": result["requirements"],
            "metadata": result["metadata"],
        }
    except Exception as e:
        logger.error("Error parsing job description: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error parsing job description: {e}")

@app.post("/api/match_skills", response_model=SkillMatchResponse)
async def match_skills(request: SkillMatchRequest):
    try:
        if not request.resume_skills or not request.job_skills:
            raise HTTPException(status_code=400, detail="Both resume and job skills are required")
        result = skill_matcher.match(request.resume_skills, request.job_skills)
        recommendations = skill_recommender.get_recommendations(result["missing_skills"])
        return SkillMatchResponse(
            overall_match=result["overall_match"],
            matched_skills=result["matched_skills"],
            missing_skills=result["missing_skills"],
            partial_matches=result["partial_matches"],
            recommendations=recommendations,
        )
    except Exception as e:
        logger.error("Error matching skills: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error matching skills: {e}")

@app.post("/api/analyze")
async def analyze_resume_job(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...),
    user_id: str | None = Form(None),  # accept optional user_id from client
):
    try:
        resume_content = await resume_file.read()
        if not resume_content:
            raise HTTPException(status_code=400, detail="Uploaded resume file is empty")
        if not job_description.strip():
            raise HTTPException(status_code=400, detail="Job description text is required")

        resume_result = resume_parser.parse(resume_content, resume_file.filename)
        job_result = job_parser.extract_skills(job_description)

        match_result = skill_matcher.match(resume_result["skills"], job_result["skills"])
        recommendations = skill_recommender.get_recommendations(match_result["missing_skills"])

        # Persist analysis if user_id provided so dashboard can load past scores
        try:
            doc = {
                "user_id": str(user_id) if user_id else None,
                "resume_filename": resume_file.filename,
                "overall_match": match_result["overall_match"],
                "matched_skills": match_result["matched_skills"],
                "missing_skills": match_result["missing_skills"],
                "partial_matches": match_result["partial_matches"],
                "job_skills": job_result["skills"],
                "resume_skills": resume_result["skills"],
                "created_at": datetime.utcnow().isoformat(),
            }
            if user_id:
                analyses_collection.insert_one(doc)
        except Exception as e:
            logger.warning(f"Failed to save analysis: {e}")

        return {
            "resume": {"filename": resume_file.filename, "skills": resume_result["skills"]},
            "job": {"skills": job_result["skills"], "requirements": job_result["requirements"]},
            "analysis": {
                "overall_match": match_result["overall_match"],
                "matched_skills": match_result["matched_skills"],
                "missing_skills": match_result["missing_skills"],
                "partial_matches": match_result["partial_matches"],
                "recommendations": recommendations,
            },
        }
    except Exception as e:
        logger.error("Error in complete analysis: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Analysis error: {e}")

# ------------------ Mock interview ------------------
class StartMockRequest(BaseModel):
    company_type: str

class AnswerRequest(BaseModel):
    session_id: str
    round_number: int
    answer: str

mock_sessions = {}
questions_dict = {
    "product": [
        {"round": 1, "type": "coding", "question": "Write a function to reverse a linked list."},
        {"round": 2, "type": "technical", "question": "Explain system design for a URL shortener."},
        {"round": 3, "type": "hr", "question": "Why do you want to join our company?"}
    ],
    "service": [
        {"round": 1, "type": "aptitude", "question": "Solve: 24 + 17 * 3 = ?"},
        {"round": 2, "type": "coding", "question": "Write code to check if a string is a palindrome."},
        {"round": 3, "type": "hr", "question": "Tell me about yourself."}
    ],
    "startup": [
        {"round": 1, "type": "resume", "question": "Walk me through a challenging project from your resume."},
        {"round": 2, "type": "case", "question": "How would you rapidly prototype a new product idea?"},
        {"round": 3, "type": "culture", "question": "How do you work in dynamic environments?"}
    ]
}

@app.post("/api/mock/start")
async def start_mock(req: StartMockRequest):
    session_id = f"session_{len(mock_sessions)}"
    rounds = questions_dict.get(req.company_type.lower(), [])
    mock_sessions[session_id] = {"company_type": req.company_type, "round": 0, "answers": []}
    return {"session_id": session_id, "question": rounds[0] if rounds else {}}

@app.post("/api/mock/answer")
async def mock_answer(req: AnswerRequest):
    sess = mock_sessions.get(req.session_id)
    if not sess:
        raise HTTPException(status_code=404, detail="Session not found")
    sess["answers"].append(req.answer)
    sess["round"] += 1
    rounds = questions_dict.get(sess["company_type"].lower(), [])
    if sess["round"] < len(rounds):
        return {"question": rounds[sess["round"]]}
    return {"end": True}

@app.get("/api/mock/feedback")
async def mock_feedback(session_id: str):
    sess = mock_sessions.get(session_id, {})
    return {
        "strengths": "Good technical depth.",
        "weaknesses": "Could improve on communication.",
        "score": 7
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
