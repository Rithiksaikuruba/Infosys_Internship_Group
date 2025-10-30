import React from 'react';
import {
  Brain,
  Target,
  Zap,
  FileText,
  BarChart3,
  BookOpen,
  Mail,
  Crown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  const teamMembers = [
    { name: 'Kuruba Rithik Sai', role: 'Team Lead & Developer', email: 'kurubarithik@gmail.com', isLead: true },
    { name: 'Amirthavarshini T D', role: 'Developer', email: 'amirthavarshini3579@gmail.com', isLead: false },
    { name: 'Meghana Anupoju', role: 'Developer', email: 'anupojumeghana9305@gmail.com', isLead: false },
    { name: 'YANKANNAGARI Swathi', role: 'Developer', email: 'yankannagariswathi@gmail.com', isLead: false }
  ];

  const features = [
    { icon: <Brain className="w-8 h-8" />, title: 'AI-Powered Analysis', description: 'Advanced NLP algorithms extract and analyze skills from resumes with precision.' },
    { icon: <Target className="w-8 h-8" />, title: 'Smart Matching', description: 'Intelligent comparison between your skills and job requirements.' },
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Gap Analysis', description: 'Identify skill gaps and get actionable insights for improvement.' },
    { icon: <BookOpen className="w-8 h-8" />, title: 'Learning Recommendations', description: 'Personalized course suggestions to bridge your skill gaps.' },
    { icon: <FileText className="w-8 h-8" />, title: 'Multi-Format Support', description: 'Upload resumes in PDF, DOC, or DOCX format.' },
    { icon: <Zap className="w-8 h-8" />, title: 'Quick Processing', description: 'Get detailed analysis and recommendations in seconds.' }
  ];

  const stats = [
    { label: 'Supported Formats', value: '3+' },
    { label: 'Skills Database', value: '500+' },
    { label: 'AI Accuracy', value: '95%' },
    { label: 'Avg. Process Time', value: '<10s' }
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Top Gradient */}
      <div
        className={`relative overflow-hidden py-20 ${isDark ? 'bg-gradient-to-r from-gray-900 to-gray-900 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'}`}
      >
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About SkillMatcher AI</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Empowering job seekers with intelligent resume analysis and personalized career growth recommendations
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`rounded-2xl shadow-xl p-8 md:p-12 transition-shadow duration-300 hover:shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h2>
          <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            SkillMatcher AI bridges the gap between job seekers and their dream careers by providing intelligent resume analysis powered by cutting-edge AI and NLP technologies.
          </p>
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Whether you are a student preparing for placements, a professional switching careers, or an HR professional, SkillMatcher AI delivers actionable insights that accelerate growth.
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Upload Resume', text: 'Upload PDF, DOC, or DOCX, or use QR mobile upload.' },
              { step: 2, title: 'Enter Job Description', text: 'Paste the JD with requirements and responsibilities.' },
              { step: 3, title: 'AI Analysis', text: 'AI extracts skills and matches against the JD.' },
              { step: 4, title: 'Get Recommendations', text: 'Receive gaps and personalized learning courses.' }
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg transition-transform duration-300 hover:scale-110">
                  {s.step}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform cursor-pointer ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              tabIndex={0}
              aria-label={f.title}
              role="article"
            >
              <div className={`mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{f.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-r from-gray-900 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-blue-100 text-sm md:text-base">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Meet Our Team</h2>
          <p className={`text-center mb-12 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>The minds behind SkillMatcher AI</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((m) => (
              <div
                key={m.email}
                className={`relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } ${m.isLead ? isDark ? 'ring-4 ring-yellow-500' : 'ring-4 ring-yellow-400' : ''}`}
              >
                {m.isLead && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-lg">
                      <Crown className="w-4 h-4" />
                      <span>Team Lead</span>
                    </div>
                  </div>
                )}
                <div
                  className={`h-32 bg-gradient-to-r flex items-center justify-center ${m.isLead ? 'from-yellow-400 to-yellow-600' : 'from-blue-500 to-indigo-600'}`}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=${
                      m.isLead ? 'F59E0B' : '6366F1'
                    }&color=fff&size=96`}
                    alt={`${m.name} profile`}
                    className="rounded-full w-24 h-24 shadow-xl"
                  />
                </div>
                <div className="p-6 pt-16 -mt-12 relative">
                  <h3 className={`text-xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{m.name}</h3>
                  <p
                    className={`text-center mb-4 font-medium ${m.isLead ? isDark ? 'text-yellow-400' : 'text-yellow-600' : isDark ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    {m.role}
                  </p>
                  <a
                    href={`mailto:${m.email}`}
                    className={`flex items-center justify-center gap-2 text-sm break-all transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{m.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-r from-gray-900 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Discover Your Skill Gaps?</h2>
          <p className="text-xl text-blue-100 mb-8">Start analyzing your resume today and get personalized recommendations</p>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Try SkillMatcher AI Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
