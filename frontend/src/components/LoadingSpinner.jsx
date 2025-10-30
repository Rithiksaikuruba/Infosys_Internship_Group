import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 max-w-sm mx-4 text-center transition-colors`}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Analyzing Skills
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Processing your resume and job description using AI...
        </p>
        <div className={`mt-4 space-y-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
            Parsing resume content
          </div>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2" style={{animationDelay: '0.5s'}}></div>
            Extracting skills using NLP
          </div>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2" style={{animationDelay: '1s'}}></div>
            Calculating similarity scores
          </div>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2" style={{animationDelay: '1.5s'}}></div>
            Generating recommendations
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
