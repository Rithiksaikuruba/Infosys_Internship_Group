import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  Target, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Activity,
  BarChart3,
  FileCheck,
  Zap
} from 'lucide-react';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
  </div>
);

// Skeleton Loader for Cards
const SkeletonCard = () => (
  <div className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100 animate-pulse">
    <div className="flex flex-col items-center">
      <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-28 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-full w-32 mt-2"></div>
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-100 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
    <div className="space-y-4">
      <div className="h-56 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const SkeletonProgress = () => (
  <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-100 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <div className="h-3 bg-gray-200 rounded w-28"></div>
            <div className="h-3 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

// Color Helper
const getColor = (score) => {
  if (score > 80) return '#22c55e';
  if (score > 60) return '#eab308';
  if (score > 40) return '#fb923c';
  return '#ef4444';
};

// ATS Score Circle Component
const ATSScoreCircle = ({ score, matched, total, loading }) => {
  if (loading) return <SkeletonCard />;

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg bg-gradient-to-br from-white to-blue-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="relative mb-6">
        <svg width="200" height="200" className="transform transition-transform duration-500 hover:scale-105">
          <circle cx="100" cy="100" r="85" stroke="#f3f4f6" strokeWidth="16" fill="none" />
          <circle
            cx="100" cy="100" r="85"
            stroke={getColor(score)}
            strokeWidth="16"
            fill="none"
            strokeDasharray={2 * Math.PI * 85}
            strokeDashoffset={2 * Math.PI * 85 - (2 * Math.PI * 85 * score) / 100}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          <text x="100" y="115" textAnchor="middle" fontSize="56" fill={getColor(score)} fontWeight="bold">
            {score}%
          </text>
        </svg>
      </div>
      
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">ATS Score</h3>
      <p className="text-base text-gray-600 mb-3">
        <span className="font-bold text-gray-900">{matched}</span> 
        <span className="text-gray-500"> / {total}</span> keywords matched
      </p>
      
      <div className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 flex items-center gap-2 ${
        score > 70 
          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
      }`}>
        {score > 70 ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Excellent Match
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4" />
            Needs Optimization
          </>
        )}
      </div>
    </div>
  );
};

// Keyword Density Chart Component
const KeywordDensityChart = ({ data, loading }) => {
  if (loading) return <SkeletonChart />;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-bold text-gray-900 mb-2 text-sm">{payload[0].payload.category}</p>
          <div className="space-y-1">
            <p className="text-xs flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-gray-700">Your Resume: <strong className="text-blue-600">{payload[0].value}%</strong></span>
            </p>
            <p className="text-xs flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400 mr-2"></span>
              <span className="text-gray-700">Recommended: <strong className="text-gray-600">{payload[1].value}%</strong></span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-indigo-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h3 className="text-2xl font-extrabold text-gray-900">Keyword Density</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-xs text-gray-600 font-medium">Live Analysis</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={10} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} 
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            dy={8}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            label={{ 
              value: 'Density (%)', 
              angle: -90, 
              position: 'insideLeft', 
              style: { fill: '#6b7280', fontSize: 12, fontWeight: 600 } 
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} />
          <Legend 
            wrapperStyle={{ paddingTop: '15px' }}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs text-gray-700 font-semibold">
                {value === 'yourResume' ? 'Your Resume' : 'Recommended'}
              </span>
            )}
          />
          <Bar dataKey="yourResume" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="recommended" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ label, percentage, loading }) => {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-800">{label}</span>
        <span className="text-sm font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-xs">
          {percentage}%
        </span>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
            percentage > 70 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
            percentage > 50 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
            'bg-gradient-to-r from-orange-400 to-orange-600'
          }`}
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    </div>
  );
};

// Structure & Readability Component
const StructureReadability = ({ loading }) => {
  if (loading) return <SkeletonProgress />;

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-purple-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-extrabold text-gray-900">Structure & Readability</h3>
        </div>
        <CheckCircle2 className="w-5 h-5 text-purple-600" />
      </div>
      
      <div className="space-y-1">
        <ProgressBar label="Section Organization" percentage={70} loading={loading} />
        <ProgressBar label="Content Readability" percentage={85} loading={loading} />
        <ProgressBar label="Formatting Compatibility" percentage={55} loading={loading} />
        <ProgressBar label="File Type Optimization" percentage={90} loading={loading} />
      </div>
    </div>
  );
};

// Recommendations Section
const RecommendationsSection = ({ loading }) => {
  if (loading) {
    return (
      <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-100 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const recommendations = [
    {
      icon: Target,
      title: 'Add More Keywords',
      description: 'Include industry-specific keywords in Core Skills and Projects sections',
      priority: 'high',
      color: 'red'
    },
    {
      icon: FileText,
      title: 'Improve Formatting',
      description: 'Use consistent bullet points and proper section headers',
      priority: 'medium',
      color: 'yellow'
    },
    {
      icon: Sparkles,
      title: 'Enhance Education',
      description: 'You\'re doing great! Maintain current keyword density',
      priority: 'low',
      color: 'green'
    }
  ];

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-green-50 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <Zap className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl font-extrabold text-gray-900">Quick Recommendations</h3>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                rec.color === 'red' ? 'bg-red-50 border-red-200 hover:shadow-md hover:shadow-red-100' :
                rec.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 hover:shadow-md hover:shadow-yellow-100' :
                'bg-green-50 border-green-200 hover:shadow-md hover:shadow-green-100'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2.5 rounded-lg ${
                  rec.color === 'red' ? 'bg-red-100' :
                  rec.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    rec.color === 'red' ? 'text-red-600' :
                    rec.color === 'yellow' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">{rec.description}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  rec.color === 'red' ? 'bg-red-200 text-red-800' :
                  rec.color === 'yellow' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Dashboard Component
const ATSDashboard = () => {
  const [loading, setLoading] = useState(true);

  const keywordData = [
    { category: 'Core Skills', yourResume: 65, recommended: 80 },
    { category: 'Experience', yourResume: 72, recommended: 85 },
    { category: 'Education', yourResume: 85, recommended: 75 },
    { category: 'Projects', yourResume: 48, recommended: 70 },
    { category: 'Certifications', yourResume: 60, recommended: 65 }
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-4 md:py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            ATS Score & Optimization
          </h1>
          <p className="text-lg text-gray-600 font-medium flex items-center justify-center md:justify-start gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            How your resume performs against Applicant Tracking Systems
          </p>
        </div>
        
        {/* Main Grid - Compact spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ATSScoreCircle score={68} matched={24} total={35} loading={loading} />
          <KeywordDensityChart data={keywordData} loading={loading} />
        </div>
        
        {/* Structure Section */}
        <div className="mb-6">
          <StructureReadability loading={loading} />
        </div>

        {/* Recommendations Section */}
        <div>
          <RecommendationsSection loading={loading} />
        </div>

      </div>
    </div>
  );
};

export default ATSDashboard;
