// frontend/src/services/api.js
/**
 * API Service for communicating with FastAPI backend
 */

const RAW_BASE = (process.env.REACT_APP_API_URL || 'http://localhost:8000').trim();
// Normalize: remove trailing slashes
const BASE = RAW_BASE.replace(/\/+$/, '');

class ApiService {
  constructor() {
    this.baseURL = BASE;
    // Force absolute base to bypass dev proxy issues; all requests go to backend directly
    this.apiPrefix = this.baseURL; // e.g., "http://localhost:8000"
  }

  // ---------------- core fetch wrapper ----------------
  async makeRequest(endpoint, options = {}) {
    // Always build an API path beginning with "/api"
    const clean = endpoint || '/';
    const path = clean.startsWith('/api/')
      ? clean
      : `/api${clean.startsWith('/') ? clean : `/${clean}`}`;

    const url = `${this.apiPrefix}${path}`;

    const defaultOpts = {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    const finalOpts = { ...defaultOpts, ...options };

    // For FormData, let the browser set the boundary
    if (finalOpts.body instanceof FormData) {
      delete finalOpts.headers['Content-Type'];
    }

    try {
      const res = await fetch(url, finalOpts);

      if (!res.ok) {
        let msg = 'Unknown error';
        try {
          const data = await res.json();
          msg = data?.detail || data?.message || res.statusText || `HTTP ${res.status}`;
        } catch {
          msg = res.statusText || `HTTP ${res.status}`;
        }
        const err = new Error(msg);
        err.status = res.status;
        err.detail = msg;
        err.response = { data: { detail: msg } };
        throw err;
      }

      const text = await res.text();
      return text ? JSON.parse(text) : null;
    } catch (err) {
      console.error(`API error [${endpoint}]`, err);
      if (err.detail) throw err;
      const netErr = new Error(err.message || 'Network error');
      netErr.detail = err.message || 'Network error';
      throw netErr;
    }
  }

  // ---------------- endpoint helpers -----------------

  // Upload + parse resume -> POST /api/parse_resume
  parseResume(file) {
    const fd = new FormData();
    fd.append('file', file);
    return this.makeRequest('/parse_resume', { method: 'POST', body: fd });
  }

  // Parse job description -> POST /api/parse_job_description
  parseJobDescription(text) {
    return this.makeRequest('/parse_job_description', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Match two skill lists -> POST /api/match_skills
  matchSkills(resumeSkills, jobSkills) {
    return this.makeRequest('/match_skills', {
      method: 'POST',
      body: JSON.stringify({ resume_skills: resumeSkills, job_skills: jobSkills }),
    });
  }

  // Full analysis with optional userId persistence -> POST /api/analyze
  analyzeComplete(resumeFile, jobDescription, userId) {
    const fd = new FormData();
    fd.append('resume_file', resumeFile);
    fd.append('job_description', jobDescription);
    if (userId) fd.append('user_id', userId);
    return this.makeRequest('/analyze', { method: 'POST', body: fd });
  }

  // Fetch saved analyses/scores -> GET /api/users/:id/resume-scores
  getUserResumeScores(userId) {
    return this.makeRequest(`/users/${userId}/resume-scores`, { method: 'GET' });
  }

  // Health check: call backend root directly (not under /api)
  async healthCheck() {
    const url = `${this.baseURL}/`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
}

// -------- singleton exports -----------
const apiService = new ApiService();

export const parseResume = (f) => apiService.parseResume(f);
export const parseJobDescription = (t) => apiService.parseJobDescription(t);
export const matchSkills = (rSkills, jSkills) => apiService.matchSkills(rSkills, jSkills);
export const analyzeResumeAndJob = (file, jd, userId) => apiService.analyzeComplete(file, jd, userId);
export const getUserResumeScores = (userId) => apiService.getUserResumeScores(userId);
export const checkHealth = () => apiService.healthCheck();

export default apiService;
