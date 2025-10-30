"""
Job Description Parser Service
NLP-powered extraction of skills and requirements from job descriptions
"""
import re
from typing import Dict, List
import spacy
import logging

logger = logging.getLogger(__name__)

class JobDescriptionParser:
    def __init__(self):
        """Initialize the job description parser"""
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.warning("SpaCy model not found. Install with: python -m spacy download en_core_web_sm")
            self.nlp = None

        # Enhanced skill patterns
        self.skill_patterns = {
            'programming_languages': [
                'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'php', 
                'ruby', 'go', 'rust', 'kotlin', 'swift', 'scala', 'r', 'matlab',
                'perl', 'bash', 'shell scripting', 'powershell'
            ],
            'web_technologies': [
                'html', 'css', 'react', 'angular', 'vue.js', 'node.js', 'express.js', 
                'django', 'flask', 'spring boot', 'laravel', 'wordpress', 'jquery',
                'bootstrap', 'tailwind css', 'sass', 'less', 'webpack', 'babel'
            ],
            'databases': [
                'mysql', 'postgresql', 'mongodb', 'sqlite', 'redis', 'elasticsearch',
                'oracle', 'sql server', 'cassandra', 'dynamodb', 'neo4j', 'influxdb'
            ],
            'cloud_platforms': [
                'aws', 'azure', 'gcp', 'google cloud platform', 'docker', 'kubernetes', 
                'jenkins', 'terraform', 'ansible', 'vagrant', 'helm', 'istio'
            ],
            'data_science': [
                'machine learning', 'deep learning', 'artificial intelligence', 'nlp',
                'computer vision', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas',
                'numpy', 'matplotlib', 'seaborn', 'jupyter', 'tableau', 'power bi'
            ],
            'tools_frameworks': [
                'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack',
                'figma', 'adobe creative suite', 'photoshop', 'illustrator', 'sketch',
                'postman', 'swagger', 'api testing'
            ],
            'methodologies': [
                'agile', 'scrum', 'kanban', 'devops', 'ci/cd', 'tdd', 'bdd',
                'microservices', 'rest api', 'graphql', 'soap', 'mvc', 'mvvm'
            ],
            'soft_skills': [
                'leadership', 'communication', 'teamwork', 'problem solving',
                'critical thinking', 'project management', 'time management',
                'adaptability', 'creativity', 'attention to detail'
            ]
        }

        # Flatten skills for easier matching
        self.all_skills = []
        for category, skills in self.skill_patterns.items():
            self.all_skills.extend(skills)

        # Requirement keywords
        self.requirement_keywords = [
            'required', 'must have', 'essential', 'mandatory', 'minimum',
            'necessary', 'prerequisite', 'critical', 'key requirement'
        ]

        self.preferred_keywords = [
            'preferred', 'nice to have', 'plus', 'bonus', 'advantage',
            'desirable', 'ideal', 'would be great'
        ]

    def extract_sections(self, text: str) -> Dict[str, str]:
        """Extract different sections from job description"""
        if not text:
            return {}
        sections = {}
        text_lines = text.split('\n')
        current_section = 'general'
        current_content = []

        section_headers = {
            'requirements': ['requirements', 'qualifications', 'skills required', 'must have'],
            'responsibilities': ['responsibilities', 'duties', 'role', 'what you will do'],
            'preferred': ['preferred', 'nice to have', 'plus', 'bonus'],
            'benefits': ['benefits', 'perks', 'what we offer', 'compensation'],
            'company': ['about us', 'company', 'who we are']
        }

        for line in text_lines:
            line_lower = line.lower().strip()

            # Check if line is a section header
            section_found = False
            for section_name, headers in section_headers.items():
                if any(header in line_lower for header in headers):
                    # Save previous section
                    sections[current_section] = '\n'.join(current_content)
                    current_section = section_name
                    current_content = []
                    section_found = True
                    break

            if not section_found:
                current_content.append(line)

        # Save last section
        sections[current_section] = '\n'.join(current_content)

        return sections

    def extract_skills_from_text(self, text: str) -> List[str]:
        """Extract skills using pattern matching and NLP"""
        if not text:
            return []
        found_skills = set()
        text_lower = text.lower()

        # Pattern-based extraction
        for skill in self.all_skills:
            skill_pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(skill_pattern, text_lower):
                found_skills.add(skill.title())

        # Additional patterns for common variations
        skill_variations = {
            'javascript': ['js', 'javascript', 'ecmascript'],
            'python': ['python', 'python3', 'py'],
            'node.js': ['nodejs', 'node.js', 'node'],
            'react': ['react.js', 'reactjs', 'react'],
            'angular': ['angular', 'angular.js', 'angularjs'],
            'vue.js': ['vue', 'vue.js', 'vuejs']
        }

        for main_skill, variations in skill_variations.items():
            for variation in variations:
                if re.search(r'\b' + re.escape(variation.lower()) + r'\b', text_lower):
                    found_skills.add(main_skill.title())

        return list(found_skills)

    def categorize_requirements(self, text: str) -> Dict[str, List[str]]:
        """Categorize requirements as required vs preferred"""
        if not text:
            return {'required': [], 'preferred': []}
        requirements = {'required': [], 'preferred': []}

        sentences = re.split(r'[.!?\n]', text)

        for sentence in sentences:
            sentence_lower = sentence.lower().strip()
            if not sentence_lower:
                continue

            skills_in_sentence = self.extract_skills_from_text(sentence)

            if any(keyword in sentence_lower for keyword in self.requirement_keywords):
                requirements['required'].extend(skills_in_sentence)
            elif any(keyword in sentence_lower for keyword in self.preferred_keywords):
                requirements['preferred'].extend(skills_in_sentence)
            else:
                # Default to required if not explicitly mentioned
                requirements['required'].extend(skills_in_sentence)

        # Remove duplicates
        requirements['required'] = list(set(requirements['required']))
        requirements['preferred'] = list(set(requirements['preferred']))

        return requirements

    def extract_experience_level(self, text: str) -> Dict[str, int]:
        """Extract experience level requirements"""
        if not text:
            return {'min_years': 0, 'max_years': 0}
        text_lower = text.lower()
        experience_info = {'min_years': 0, 'max_years': 0}

        # Patterns for experience extraction
        patterns = [
            r'(\d+)\+?\s*years?\s*of\s*experience',
            r'(\d+)\+?\s*years?\s*experience',
            r'minimum\s*(\d+)\+?\s*years?',
            r'at least\s*(\d+)\+?\s*years?',
            r'(\d+)-(\d+)\s*years?\s*experience',
            r'(\d+)\s*to\s*(\d+)\s*years?'
        ]

        for pattern in patterns:
            matches = re.findall(pattern, text_lower)
            if matches:
                if isinstance(matches[0], tuple):  # Range pattern
                    experience_info['min_years'] = int(matches[0][0])
                    experience_info['max_years'] = int(matches[0][1])
                else:  # Single number
                    years = int(matches[0])
                    experience_info['min_years'] = years
                break

        return experience_info

    def extract_skills(self, text: str) -> Dict:
        """Main method to extract skills and requirements from job description"""
        try:
            if not text:
                return {
                    'skills': [],
                    'requirements': {'required': [], 'preferred': []},
                    'sections': {},
                    'metadata': {
                        'total_skills': 0,
                        'required_skills': 0,
                        'preferred_skills': 0,
                        'experience_required': {'min_years': 0, 'max_years': 0},
                        'sections': []
                    }
                }
            # Extract sections
            sections = self.extract_sections(text)

            # Extract all skills
            all_skills = self.extract_skills_from_text(text)

            # Categorize requirements
            requirements = self.categorize_requirements(text)

            # Extract experience requirements
            experience_info = self.extract_experience_level(text)

            # Additional metadata
            metadata = {
                'total_skills': len(all_skills),
                'required_skills': len(requirements['required']),
                'preferred_skills': len(requirements['preferred']),
                'experience_required': experience_info,
                'sections': list(sections.keys())
            }

            return {
                'skills': all_skills,
                'requirements': requirements,
                'sections': sections,
                'metadata': metadata
            }

        except Exception as e:
            logger.error(f"Error extracting skills from job description: {str(e)}")
            raise e
