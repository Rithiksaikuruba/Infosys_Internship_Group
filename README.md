SkillMatcher AI — Resume & Job Skill Analysis Platform

An end-to-end web application that uses NLP and machine learning to parse resumes, extract skills from job descriptions, match them intelligently, and suggest focused learning resources based on gaps and priorities.

Features
Core functionality
Resume Parsing: Extracts text and skills from PDF/DOCX files with NLP-driven parsing.

Job Description Analysis: Identifies required and preferred skills from raw text.

Advanced Skill Matching: Uses sentence-transformer embeddings for semantic similarity.

Gap Analysis: Highlights missing and partially matched skills with explanations.

Intelligent Recommendations: Ranks learning resources by impact and urgency.

Interactive Dashboard: Modern React UI with clear charts and summaries.

Technology stack
Frontend: React.js, Tailwind CSS, Recharts.

Backend: Python FastAPI with NLP utilities.

Database: MongoDB with async access via Motor.

ML/NLP: spaCy, Sentence Transformers, Transformers.

Document Processing: pdfplumber, python-docx.

Installation & setup
Prerequisites
Node.js 16+ and npm.

Python 3.8+.

MongoDB (local or Atlas).

Backend setup
Navigate to the backend directory:

bash
cd backend
Create and activate a virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install Python dependencies:

bash
pip install -r requirements.txt
Download the spaCy model:

bash
python -m spacy download en_core_web_sm
Configure environment variables:

bash
cp .env.example .env
# Edit .env with your MongoDB connection string
Start the FastAPI server:

bash
python main.py
# Or: uvicorn main:app --reload
The backend runs at http://localhost:8000.

Frontend setup
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
The frontend runs at http://localhost:3000.

Database setup
Install MongoDB locally or use MongoDB Atlas.

Create a database named skill_matcher_db.

Update the connection string in the .env file.

API documentation
Once the backend is running, visit:

Interactive docs: http://localhost:8000/docs

Alternative docs: http://localhost:8000/redoc

Main endpoints
/analyze (POST)
Complete analysis for a resume and job description:

bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "resume_file=@resume.pdf" \
  -F "job_description=Job description text here..."
/parse_resume (POST)
Parse a resume file and extract skills:

bash
curl -X POST "http://localhost:8000/parse_resume" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resume.pdf"
/parse_job_description (POST)
Extract skills from a job description:

bash
curl -X POST "http://localhost:8000/parse_job_description" \
  -H "Content-Type: application/json" \
  -d '{"text": "Job description text..."}'
/match_skills (POST)
Match resume skills to job requirements:

bash
curl -X POST "http://localhost:8000/match_skills" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_skills": ["Python", "JavaScript", "React"],
    "job_skills": ["Python", "AWS", "Docker"]
  }'
Project structure
text
skill-matcher-ai/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── services/
│   │   ├── resume_parser.py     # Resume parsing with NLP
│   │   ├── job_parser.py        # Job description analysis
│   │   ├── skill_matcher.py     # Matching algorithms
│   │   └── recommender.py       # Learning recommendations
│   ├── models/                  # Database models
│   ├── config/                  # Database configuration
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment template
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API service layer
│   │   ├── App.jsx              # Main app
│   │   └── index.js             # React entry point
│   ├── package.json             # Node dependencies
│   └── tailwind.config.js       # Tailwind configuration
└── README.md
NLP & ML features
Resume parsing
Text Extraction: PDF/DOCX processing via pdfplumber and python-docx.

Skill Recognition: Pattern matching combined with NER.

Contact Info Extraction: Email, phone, LinkedIn, GitHub via regex.

Experience Analysis: Heuristics for years of experience.

Job description analysis
Section Parsing: Detects requirements, responsibilities, and benefits.

Skill Classification: Separates required and preferred skills.

Experience Requirements: Extracts min/max years.

Priority Detection: Flags high-priority skills from context.

Skill matching algorithm
Exact Matching: Normalized string comparison for direct matches.

Semantic Similarity: Sentence Transformers for context-aware matching.

Synonym Recognition: Built-in synonym mapping for common variants.

Partial Matching: Configurable string similarity thresholds.

Scoring System: Weighted scores for exact and partial matches.

Recommendation engine
Priority Scoring: Ranks skills by importance and frequency.

Learning Resources: Curated list of courses and tutorials.

Time Estimation: Practical time-to-learn estimates.

Personalized Tips: Context-aware guidance per gap.

Multi-Platform: Includes free and paid options.

Use cases
Job Seekers: Check resume fit against specific postings.

Career Counselors: Offer data-backed guidance.

HR Professionals: Speed up shortlisting with skill signals.

Students: Identify gaps for targeted preparation.

Professionals: Plan upskilling with measurable goals.

Contributing
Fork the repository.

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push the branch: git push origin feature/amazing-feature

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Support
For help or questions:

Open an issue in the repository.

Email: support@skillmatcher.ai

Deployment
Production
Backend: Serve FastAPI with Gunicorn and Nginx, or use Docker.

Frontend: Build with npm run build and serve via Nginx.

Database: Use MongoDB Atlas or self-hosted MongoDB.

Environment: Set and secure production environment variables.

Docker (optional)
bash
# Backend
cd backend
docker build -t skillmatcher-api .
docker run -p 8000:8000 skillmatcher-api

# Frontend
cd frontend
docker build -t skillmatcher-ui .
docker run -p 3000:3000 skillmatcher-ui
Performance & scaling
Caching: Use Redis to cache resume parsing results.

Queueing: Run background jobs with Celery or RQ.

Load Balancing: Scale multiple FastAPI instances.

CDN: Serve static assets and uploads via a CDN.

Monitoring: Add logging, tracing, and performance dashboards.