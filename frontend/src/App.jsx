import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeResumeAndJob } from './services/api';
import FeaturesSection from './components/FeaturesSection';
import Login from './components/Login';
import Signup from './components/Signup';
import MockInterview from './components/MockInterview';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import About from './components/About'; // Capital A -- matches your file!
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppContent() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('upload');

  const handleAnalysis = async (resumeFile, jobDescription) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeResumeAndJob(
        resumeFile,
        jobDescription,
        user?._id || user?.id
      );
      setAnalysisData(result);
      setCurrentStep('results');
    } catch (err) {
      let errorMessage = 'An error occurred during analysis';
      if (err?.response?.data) {
        if (err.response.data.detail) errorMessage = err.response.data.detail;
        else if (err.response.data.message) errorMessage = err.response.data.message;
        else if (typeof err.response.data === 'string') errorMessage = err.response.data;
      } else if (err?.detail) errorMessage = err.detail;
      else if (err?.message) errorMessage = err.message;
      else if (typeof err === 'string') errorMessage = err;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setError(null);
    setCurrentStep('upload');
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Analysis Error</h3>
                        <p className="mt-1 text-sm text-red-700 dark:text-red-100">{error}</p>
                        <button
                          onClick={() => setError(null)}
                          className="mt-2 text-xs text-red-600 hover:text-red-500 underline"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {isLoading && <LoadingSpinner />}
                {!isLoading && currentStep === 'upload' && <UploadAndInputSection onAnalysis={handleAnalysis} />}
                {!isLoading && currentStep === 'results' && analysisData && (
                  <ResultsDashboard data={analysisData} onNewAnalysis={handleNewAnalysis} />
                )}
              </>
            }
          />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mockinterview" element={<MockInterview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

function UploadAndInputSection({ onAnalysis }) {
  const { isDark } = useTheme();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please upload a resume file');
      return;
    }
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }
    onAnalysis(resumeFile, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Skill Resume Matcher And Recommender
        </h1>
        <p className={`text-xl max-w-3xl mx-auto transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Upload your resume and enter a job description to get detailed skill matching, gap analysis, and personalized learning recommendations.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ResumeUpload onFileSelect={setResumeFile} selectedFile={resumeFile} />
        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={!resumeFile || !jobDescription.trim()}
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Analyze Skills
        </button>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
