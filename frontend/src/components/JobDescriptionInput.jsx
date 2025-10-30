import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const JobDescriptionInput = ({ value, onChange }) => {
  const { isDark } = useTheme();
  const [charCount, setCharCount] = useState(value.length);
  const maxChars = 5000;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      onChange(text);
      setCharCount(text.length);
    }
  };

  const sampleJobs = [
    {
      title: 'Senior Software Engineer',
      description: `We are looking for a Senior Software Engineer with 5+ years of experience in full-stack development.

Required Skills:
- JavaScript, TypeScript
- React, Node.js
- PostgreSQL, MongoDB
- AWS, Docker
- REST APIs, GraphQL
- Git, CI/CD
- Agile development

Preferred Skills:
- Microservices architecture
- Testing frameworks (Jest, Cypress)
- Leadership experience

Responsibilities:
- Design and develop scalable web applications
- Mentor junior developers
- Collaborate with product teams
- Code reviews and technical documentation`,
    },
    {
      title: 'Data Scientist',
      description: `Join our data science team to build ML models and drive insights.

Required Skills:
- Python, R
- Machine Learning, Deep Learning
- TensorFlow, PyTorch, Scikit-learn
- Pandas, NumPy
- SQL, NoSQL databases
- Statistics, Mathematics
- Data visualization (Tableau, Power BI)

Preferred Skills:
- MLOps, Docker
- Cloud platforms (AWS, GCP)
- Natural Language Processing
- Computer Vision

Responsibilities:
- Develop predictive models
- Analyze large datasets
- Present findings to stakeholders
- Deploy ML models to production`,
    },
  ];

  const loadSample = (sample) => {
    onChange(sample.description);
    setCharCount(sample.description.length);
  };

  return (
    <div
      className={`rounded-2xl p-8 transition-all duration-600 group relative ${
        isDark ? 'bg-gray-900 shadow-[0_12px_40px_rgba(33,107,243,0.5)]' : 'bg-white shadow-xl'
      } ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
      style={{
        boxShadow: isDark
          ? '0 12px 40px -6px rgba(33, 107, 243, 0.45)'
          : '0 10px 40px -12px rgba(33, 107, 243, 0.18), 0 1.5px 18px rgba(30,42,73,0.1)',
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_6px_48px_8px_rgba(33,107,243,0.24)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    motion-reduce:transition-none"
        style={{ willChange: 'box-shadow' }}
      ></div>

      <div className="flex items-center justify-between mb-4 animate-fadeIn">
        <h3
          className={`text-lg font-semibold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          Job Description
        </h3>
        <div
          id="char-counter"
          className={`text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          aria-live="polite"
        >
          {charCount}/{maxChars} characters
        </div>
      </div>

      <div className="space-y-4">
        {/* DOTTED CARD, border only visible on hover/focus */}
        <div
          className={`
            group/textarea
            rounded-xl transition-all duration-300
            ${isDark ? 'bg-gray-800' : 'bg-white'}
            shadow-inner
            relative
          `}
          style={{
            boxShadow: '0 1px 12px rgba(33,107,243,0.08)',
            minHeight: '280px',
            willChange: 'box-shadow'
          }}
        >
          <textarea
            value={value}
            onChange={handleChange}
            placeholder="Paste the job description here... Include requirements, responsibilities, and preferred qualifications for best results."
            className={`
              w-full h-64 p-4 rounded-xl bg-transparent border-none
              focus-visible:outline-none focus:z-10
              focus:bg-transparent
              resize-none text-sm transition-colors animate-fadeIn group-hover:shadow-lg
              leading-relaxed
              ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
            `}
            style={{
              minHeight: '256px',
              background: 'transparent',
              boxShadow: 'none',
              position: 'relative',
              zIndex: 2
            }}
            aria-describedby="char-counter"
            aria-label="Job description input"
            onFocus={e => e.target.parentNode.classList.add('show-dotted')}
            onBlur={e => e.target.parentNode.classList.remove('show-dotted')}
          />
          {/* Dotted border absolutely positioned, only shown on hover/focus */}
          <div className="dotted-border-pointer-events-none absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"></div>
        </div>

        <div className="flex flex-wrap gap-3 animate-fadeIn">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sample jobs:</span>
          {sampleJobs.map((job, idx) => (
            <button
              key={idx}
              onClick={() => loadSample(job)}
              className={`px-4 py-1 text-xs rounded-full transition-all duration-350
                          focus:scale-110 hover:scale-115 active:scale-95 animate-slideInUp
                          focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-400
                          ${isDark ? 'bg-blue-900 text-blue-300 hover:bg-blue-800 shadow-md'
                                   : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm'}`}
              style={{ fontWeight: '600', boxShadow: '0 1px 10px rgba(33,107,243,0.1)', willChange: 'transform' }}
              type="button"
              aria-label={`Load sample: ${job.title}`}
            >
              {job.title}
            </button>
          ))}
        </div>

        {value.trim() && (
          <div
            className={`p-4 rounded-lg transition-colors animate-fadeIn group-hover:shadow-xl ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <svg
                className="w-5 h-5 mr-2 text-green-700 drop-shadow-md"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Job description ready for analysis
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .ease-spring { animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          ::selection {
            background: rgba(33,107,243,0.2);
            color: inherit;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(42px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-slideInUp { animation: slideInUp 0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          .dotted-border-pointer-events-none {
            border: 2px dotted transparent;
          }
          .group\\/textarea:hover .dotted-border-pointer-events-none,
          .group\\/textarea.show-dotted .dotted-border-pointer-events-none,
          .group\\/textarea:focus-within .dotted-border-pointer-events-none {
            border-color: #2196f3 !important; /* blue-400 */
            transition: border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          }
          @media (prefers-color-scheme: dark) {
            .group\\/textarea:hover .dotted-border-pointer-events-none,
            .group\\/textarea.show-dotted .dotted-border-pointer-events-none,
            .group\\/textarea:focus-within .dotted-border-pointer-events-none {
              border-color: #60a5fa !important; /* blue-400 (normally lighter in dark mode) */
            }
          }
          @keyframes bounce {
            0% { transform: translateY(0); }
            30% { transform: translateY(-9px); }
            50% { transform: translateY(0); }
            70% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
          .animate-bounce { animation: bounce 0.72s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .animate-fadeIn,
            .animate-slideInUp,
            .animate-bounce {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default JobDescriptionInput;
