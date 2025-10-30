"""
Skill Matcher Service
Advanced NLP-based skill matching using semantic similarity
"""
import re
from typing import Dict, List, Tuple
import logging
from difflib import SequenceMatcher

# Optional: If sentence-transformers is available
try:
    from sentence_transformers import SentenceTransformer
    import numpy as np
    SENTENCE_TRANSFORMERS_AVAILABLE = True
except ImportError:
    SENTENCE_TRANSFORMERS_AVAILABLE = False

logger = logging.getLogger(__name__)

class SkillMatcher:
    def __init__(self):
        """Initialize the skill matcher"""
        self.similarity_threshold = 0.8  # Threshold for partial matches

        # Load sentence transformer model if available
        if SENTENCE_TRANSFORMERS_AVAILABLE:
            try:
                self.model = SentenceTransformer('all-MiniLM-L6-v2')
                logger.info("Loaded SentenceTransformer model for semantic similarity")
            except Exception as e:
                logger.warning(f"Could not load SentenceTransformer: {e}")
                self.model = None
        else:
            self.model = None
            logger.info("Using basic similarity matching (install sentence-transformers for better results)")

        # Skill synonyms for better matching
        self.skill_synonyms = {
            'javascript': ['js', 'ecmascript', 'javascript', 'java script'],
            'python': ['python', 'python3', 'py'],
            'node.js': ['nodejs', 'node.js', 'node', 'node js'],
            'react': ['react', 'react.js', 'reactjs'],
            'angular': ['angular', 'angular.js', 'angularjs'],
            'vue.js': ['vue', 'vue.js', 'vuejs'],
            'machine learning': ['ml', 'machine learning', 'artificial intelligence', 'ai'],
            'deep learning': ['dl', 'deep learning', 'neural networks'],
            'natural language processing': ['nlp', 'natural language processing', 'text processing'],
            'database': ['db', 'database', 'databases', 'data storage'],
            'sql': ['sql', 'structured query language', 'database queries'],
            'nosql': ['nosql', 'no sql', 'non-relational database'],
            'api': ['api', 'application programming interface', 'rest api', 'restful api'],
            'devops': ['devops', 'dev ops', 'development operations'],
            'ci/cd': ['ci/cd', 'continuous integration', 'continuous deployment', 'cicd'],
            'docker': ['docker', 'containerization', 'containers'],
            'kubernetes': ['kubernetes', 'k8s', 'container orchestration'],
            'aws': ['aws', 'amazon web services', 'amazon aws'],
            'azure': ['azure', 'microsoft azure', 'azure cloud'],
            'gcp': ['gcp', 'google cloud', 'google cloud platform']
        }

    def normalize_skill(self, skill: str) -> str:
        """Normalize skill name for better matching"""
        return skill.lower().strip().replace('.', '').replace('-', ' ')

    def get_skill_synonyms(self, skill: str) -> List[str]:
        """Get synonyms for a skill"""
        normalized_skill = self.normalize_skill(skill)

        for main_skill, synonyms in self.skill_synonyms.items():
            if normalized_skill in [s.lower() for s in synonyms]:
                return synonyms

        return [skill]

    def calculate_text_similarity(self, text1: str, text2: str) -> float:
        """Calculate text similarity using SequenceMatcher"""
        return SequenceMatcher(None, text1.lower(), text2.lower()).ratio()

    def calculate_semantic_similarity(self, skills1: List[str], skills2: List[str]) -> float:
        """Calculate semantic similarity using sentence transformers"""
        if not self.model:
            return 0.0

        try:
            embeddings1 = self.model.encode(skills1)
            embeddings2 = self.model.encode(skills2)
            similarities = np.dot(embeddings1, embeddings2.T) / (
                np.linalg.norm(embeddings1, axis=1)[:, None] * 
                np.linalg.norm(embeddings2, axis=1)
            )
            return float(np.mean(similarities))

        except Exception as e:
            logger.error(f"Error calculating semantic similarity: {e}")
            return 0.0

    def find_exact_matches(self, resume_skills: List[str], job_skills: List[str]) -> List[str]:
        """Find exact matches between resume and job skills"""
        exact_matches = []
        resume_normalized = [self.normalize_skill(skill) for skill in resume_skills]

        for job_skill in job_skills:
            job_normalized = self.normalize_skill(job_skill)
            if job_normalized in resume_normalized:
                exact_matches.append(job_skill)
                continue

            # Check synonyms
            job_synonyms = [self.normalize_skill(s) for s in self.get_skill_synonyms(job_skill)]
            if any(syn in resume_normalized for syn in job_synonyms):
                exact_matches.append(job_skill)

        return list(set(exact_matches))

    def find_partial_matches(self, resume_skills: List[str], job_skills: List[str], 
                            exact_matches: List[str]) -> List[str]:
        """Find partial matches using string similarity"""
        partial_matches = []
        remaining_job_skills = [skill for skill in job_skills if skill not in exact_matches]

        for job_skill in remaining_job_skills:
            job_normalized = self.normalize_skill(job_skill)

            for resume_skill in resume_skills:
                resume_normalized = self.normalize_skill(resume_skill)
                similarity = self.calculate_text_similarity(job_normalized, resume_normalized)

                if similarity >= self.similarity_threshold:
                    partial_matches.append(job_skill)
                    break

                if (job_normalized in resume_normalized or 
                        resume_normalized in job_normalized):
                    partial_matches.append(job_skill)
                    break

        return list(set(partial_matches))

    def calculate_match_score(self, matched_skills: List[str], partial_matches: List[str], 
                            total_required_skills: int) -> float:
        """Calculate overall match percentage"""
        if total_required_skills == 0:
            return 100.0

        full_match_score = len(matched_skills)
        partial_match_score = len(partial_matches) * 0.5

        total_score = full_match_score + partial_match_score
        match_percentage = min(100.0, (total_score / total_required_skills) * 100)

        return round(match_percentage, 1)

    def prioritize_missing_skills(self, missing_skills: List[str], job_text: str = "") -> List[Dict]:
        """Prioritize missing skills based on frequency and context"""
        prioritized = []

        high_priority_keywords = [
            'required', 'must have', 'essential', 'mandatory', 'critical',
            'minimum', 'prerequisite', 'necessary'
        ]
        medium_priority_keywords = [
            'important', 'preferred', 'experience with', 'knowledge of'
        ]

        for skill in missing_skills:
            priority = "Low"
            context_mentions = 0

            if job_text:
                job_text_lower = job_text.lower()
                skill_lower = skill.lower()

                context_mentions = len(re.findall(r'\b' + re.escape(skill_lower) + r'\b', job_text_lower))

                for keyword in high_priority_keywords:
                    if f"{keyword}" in job_text_lower and skill_lower in job_text_lower:
                        priority = "High"
                        break

                if priority != "High":
                    for keyword in medium_priority_keywords:
                        if f"{keyword}" in job_text_lower and skill_lower in job_text_lower:
                            priority = "Medium"
                            break

            prioritized.append({
                'skill': skill,
                'priority': priority,
                'mentions': context_mentions
            })

        priority_order = {'High': 3, 'Medium': 2, 'Low': 1}
        prioritized.sort(key=lambda x: (priority_order[x['priority']], x['mentions']), reverse=True)

        return prioritized

    def match(self, resume_skills: List[str], job_skills: List[str], job_text: str = "") -> Dict:
        """Main method to match skills between resume and job requirements"""
        try:
            if not resume_skills or not job_skills:
                return {
                    'overall_match': 0.0,
                    'matched_skills': [],
                    'missing_skills': job_skills if job_skills else [],
                    'partial_matches': [],
                    'semantic_similarity': 0.0,
                    'prioritized_missing': []
                }

            exact_matches = self.find_exact_matches(resume_skills, job_skills)
            partial_matches = self.find_partial_matches(resume_skills, job_skills, exact_matches)
            all_matches = set(exact_matches + partial_matches)
            missing_skills = [skill for skill in job_skills if skill not in all_matches]
            overall_match = self.calculate_match_score(exact_matches, partial_matches, len(job_skills))

            semantic_similarity = 0.0
            if self.model and resume_skills and job_skills:
                semantic_similarity = self.calculate_semantic_similarity(resume_skills, job_skills)

            prioritized_missing = self.prioritize_missing_skills(missing_skills, job_text)

            return {
                'overall_match': overall_match,
                'matched_skills': exact_matches,
                'missing_skills': missing_skills,
                'partial_matches': partial_matches,
                'semantic_similarity': round(semantic_similarity * 100, 1) if semantic_similarity else 0.0,
                'prioritized_missing': prioritized_missing
            }
        except Exception as e:
            logger.error(f"Error in skill matching: {str(e)}")
            raise e

# ---- ADD BELOW: DB SAVE HELPER ----

from models.analysis import Analysis
from config.database import db  # Adjust as needed for your actual DB connection

def save_analysis_result(user_id, resume_id, job_description_id, resume_filename, match_result):
    """
    Save the result to the Analysis collection for dashboard/history.
    """
    analysis = Analysis(
        user_id=user_id,
        resume_id=resume_id,
        job_description_id=job_description_id,
        resume_filename=resume_filename,
        overall_match=match_result['overall_match'],
        matched_skills=match_result['matched_skills'],
        missing_skills=match_result['missing_skills'],
        partial_matches=match_result.get('partial_matches', []),
        semantic_similarity=match_result.get('semantic_similarity', 0.0),
        recommendations=[],  # Add if any
    )
    db.analysis.insert_one(analysis.dict(by_alias=True))
    return analysis
