"""
Resume Parser Service
Uses NLP to extract text and skills from PDF/DOCX files
"""
import io, os, re, logging, tempfile
from typing import Dict, List

import spacy
import pdfplumber
from PyPDF2 import PdfReader
from docx import Document
import docx2txt
from PIL import Image
import pytesseract

logger = logging.getLogger(__name__)

class ResumeParser:
    def __init__(self):
        # NLP model
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.warning("SpaCy model not found. Install: python -m spacy download en_core_web_sm")
            self.nlp = None

        # Simple skill lists
        self.skill_patterns = {
            'programming_languages': ['python','java','javascript','typescript','c++','c#','php','ruby','go','rust','kotlin','swift','scala','r','matlab'],
            'web_technologies':      ['html','css','react','angular','vue','node.js','express','django','flask','spring','laravel','wordpress','jquery'],
            'databases':             ['mysql','postgresql','mongodb','sqlite','redis','elasticsearch','oracle','sql server','cassandra','dynamodb'],
            'cloud_platforms':       ['aws','azure','gcp','google cloud','docker','kubernetes','jenkins','terraform','ansible'],
            'tools_frameworks':      ['git','github','gitlab','jira','confluence','slack','figma','photoshop','illustrator','sketch'],
            'methodologies':         ['agile','scrum','kanban','devops','ci/cd','tdd','bdd','microservices','rest api','graphql','soap']
        }
        self.all_skills = [s for lst in self.skill_patterns.values() for s in lst]

    # ------------------------------------------------------------------ PDF
    def _pdf_with_pdfplumber(self, content: bytes) -> str:
        text = ''
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for p in pdf.pages:
                if (t := p.extract_text()):
                    text += t + '\n'
        return text.strip()

    def _pdf_with_pypdf2(self, content: bytes) -> str:
        text = ''
        reader = PdfReader(io.BytesIO(content))
        for pg in reader.pages:
            if (t := pg.extract_text()):
                text += t + '\n'
        return text.strip()

    def _pdf_with_ocr(self, content: bytes) -> str:
        text = ''
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for p in pdf.pages:
                img = p.to_image(resolution=300).original
                pil_img = Image.open(io.BytesIO(img))
                text += pytesseract.image_to_string(pil_img) + '\n'
        return text.strip()

    def extract_text_from_pdf(self, content: bytes) -> str:
        for extractor, name in (
            (self._pdf_with_pdfplumber, 'pdfplumber'),
            (self._pdf_with_pypdf2,    'PyPDF2'),
            (self._pdf_with_ocr,       'OCR/pytesseract'),
        ):
            try:
                text = extractor(content)
                if text:
                    logger.info(f"PDF text extracted via {name}")
                    return text
            except Exception as e:
                logger.debug("PDF extractor %s failed: %s", name, e)
        return ''

    # ------------------------------------------------------------------ DOCX
    def _docx_with_docx(self, content: bytes) -> str:
        doc = Document(io.BytesIO(content))
        return '\n'.join(p.text for p in doc.paragraphs).strip()

    def _docx_with_docx2txt(self, content: bytes) -> str:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as tmp:
            tmp.write(content); tmp.flush()
            text = docx2txt.process(tmp.name)
        os.unlink(tmp.name)
        return text.strip()

    def extract_text_from_docx(self, content: bytes) -> str:
        for extractor, name in (
            (self._docx_with_docx,    'python-docx'),
            (self._docx_with_docx2txt,'docx2txt'),
        ):
            try:
                text = extractor(content)
                if text:
                    logger.info(f"DOCX text extracted via {name}")
                    return text
            except Exception as e:
                logger.debug("DOCX extractor %s failed: %s", name, e)
        return ''

    # ------------------------------------------------------------------ misc helpers
    def extract_contact_info(self, text: str) -> Dict:
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
        phone_pattern = r'\b(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b'

        return {
            'emails':   re.findall(email_pattern, text),
            'phones':   re.findall(phone_pattern, text),
            'linkedin': re.findall(r'linkedin\.com/in/[A-Za-z0-9-]+', text, re.I),
            'github':   re.findall(r'github\.com/[A-Za-z0-9-]+', text, re.I),
        }

    def extract_skills_nlp(self, text: str) -> List[str]:
        found = {s.title() for s in self.all_skills if re.search(rf'\b{re.escape(s)}\b', text, re.I)}
        if self.nlp:
            try:
                for ent in self.nlp(text).ents:
                    if ent.label_ in ('ORG', 'PRODUCT'):
                        if any(skill in ent.text.lower() for skill in self.all_skills):
                            found.add(ent.text.title())
            except Exception as e:
                logger.debug("SpaCy NER skipped: %s", e)
        return list(found)

    def extract_experience_years(self, text: str) -> int:
        patt = re.compile(r'(\d+)\+?\s*(?:yrs?|years?)\s*(?:of\s*)?experience', re.I)
        matches = [int(m) for m in patt.findall(text)]
        return max(matches) if matches else 0

    # ------------------------------------------------------------------ main
    def parse(self, content: bytes, filename: str) -> Dict:
        try:
            filename = filename.lower()
            if filename.endswith('.pdf'):
                text = self.extract_text_from_pdf(content)
            elif filename.endswith(('.docx', '.doc')):
                text = self.extract_text_from_docx(content)
            else:
                raise ValueError(f"Unsupported file type: {filename}")

            if not text:
                raise ValueError("No text could be extracted from the file. "
                                 "If your resume is a scanned image, please "
                                 "save it as a searchable PDF or DOCX.")

            skills         = self.extract_skills_nlp(text)
            contact_info   = self.extract_contact_info(text)
            experience_years = self.extract_experience_years(text)

            metadata = {
                'filename': filename,
                'text_length': len(text),
                'skills_count': len(skills),
                'experience_years': experience_years,
                'contact_info': contact_info,
            }

            return {'text': text, 'skills': skills, 'metadata': metadata}

        except Exception as e:
            logger.error("Resume parsing failed: %s", e, exc_info=True)
            raise

    # ATS SCORE CALCULATION - New method!
    def compute_ats_score(self, resume_skills, job_skills):
        """
        Compute ATS score as the percentage of job skills present in resume skills.
        Returns score as integer percentage and list of matched skills.
        """
        if not job_skills:
            return 0, []
        matched = set(skill.lower() for skill in resume_skills) & set(skill.lower() for skill in job_skills)
        score = int((len(matched) / len(job_skills)) * 100)
        return score, list(matched)
