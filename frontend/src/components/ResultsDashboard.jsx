import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SkillMatchChart from './SkillMatchChart';
import SkillsList from './SkillsList';
import RecommendationsList from './RecommendationsList';
import ATSSkillScore from './ATSSkillScore';

import { MdOutlineDashboard } from 'react-icons/md';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoBulbOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoFlashOutline } from 'react-icons/io5';
import { PiNotepadLight } from 'react-icons/pi';

const ResultsDashboard = ({ data, onNewAnalysis }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const {
    analysis: {
      overall_match,
      matched_skills,
      missing_skills,
      partial_matches,
      recommendations,
      ats_score = null,
      ats_matched_skills = [],
    },
    resume: { skills: resumeSkills },
    job: { skills: jobSkills },
  } = data;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <MdOutlineDashboard size={24} /> },
    { id: 'skills', name: 'Skills Analysis', icon: <HiOutlineAdjustmentsHorizontal size={24} /> },
    { id: 'recommendations', name: 'Recommendations', icon: <IoBulbOutline size={24} /> },
    { id: 'ats', name: 'ATS Score', icon: <PiNotepadLight size={24} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8 transition-colors`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Analysis Results</h2>
            <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Skill matching completed successfully</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onNewAnalysis}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Analysis
            </button>
            <button
              onClick={() => navigate('/mockinterview')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow"
            >
              Take a Mock Interview
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 mb-8 text-white">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2">{overall_match}%</div>
          <p className="text-xl opacity-90">Overall Skill Match</p>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-semibold">{matched_skills.length}</div>
              <p className="text-sm opacity-75">Matched Skills</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">{missing_skills.length}</div>
              <p className="text-sm opacity-75">Missing Skills</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">{partial_matches.length}</div>
              <p className="text-sm opacity-75">Partial Matches</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md mb-8 transition-colors`}>
        <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : `border-transparent ${
                        isDark
                          ? 'text-gray-400 hover:text-gray-200 hover:border-gray-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`
                }`}
              >
                <span className="mr-2 align-middle">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <OverviewTab
              data={data}
              overall_match={overall_match}
              matched_skills={matched_skills}
              missing_skills={missing_skills}
              partial_matches={partial_matches}
              isDark={isDark}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab
              resumeSkills={resumeSkills}
              jobSkills={jobSkills}
              matched_skills={matched_skills}
              missing_skills={missing_skills}
              partial_matches={partial_matches}
            />
          )}

          {activeTab === 'recommendations' && <RecommendationsList recommendations={recommendations} />}

          {activeTab === 'ats' && (
            <div className="flex flex-col items-center justify-center gap-6">
              <ATSSkillScore score={ats_score} matched={ats_matched_skills.length} total={jobSkills.length} />

              <div className="w-full max-w-xl mt-3 flex flex-col items-center">
                <h4 className="font-semibold text-base mb-2 text-center text-gray-700">Matched Keywords</h4>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {ats_matched_skills.length > 0
                    ? ats_matched_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          {skill}
                        </span>
                      ))
                    : <span className="text-gray-400">None matched</span>}
                </div>
                <h4 className="font-semibold text-base mb-2 text-center text-gray-700">Missing Keywords</h4>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {jobSkills
                    .filter((skill) => !ats_matched_skills.includes(skill))
                    .map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  {jobSkills.filter((skill) => !ats_matched_skills.includes(skill)).length === 0 && (
                    <span className="text-gray-400">All matched!</span>
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">How to increase your score:</span> Add missing keywords from the job
                    description into your resume, making sure they fit naturally with your actual experience!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Updated OverviewTab with icons in section headers
const OverviewTab = ({ data, overall_match, matched_skills, missing_skills, partial_matches, isDark }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Match Visualization</h3>
      <SkillMatchChart matched={matched_skills.length} missing={missing_skills.length} partial={partial_matches.length} />
    </div>

    <div className="space-y-6">
      <div
        className={`border rounded-lg p-4 ${isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}`}
      >
        <h4 className={`font-medium mb-2 ${isDark ? 'text-green-300' : 'text-green-800'}`}>
          <IoCheckmarkCircleOutline size={20} className="inline mr-1 align-text-bottom" />
          Matched Skills ({matched_skills.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {matched_skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`}
            >
              {skill}
            </span>
          ))}
          {matched_skills.length > 6 && (
            <span
              className={`px-2 py-1 text-sm rounded-full ${isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`}
            >
              +{matched_skills.length - 6} more
            </span>
          )}
        </div>
      </div>

      <div
        className={`border rounded-lg p-4 ${isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'}`}
      >
        <h4 className={`font-medium mb-2 ${isDark ? 'text-red-300' : 'text-red-800'}`}>
          <IoCloseCircleOutline size={20} className="inline mr-1 align-text-bottom" />
          Missing Skills ({missing_skills.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {missing_skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${isDark ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'}`}
            >
              {skill}
            </span>
          ))}
          {missing_skills.length > 6 && (
            <span
              className={`px-2 py-1 text-sm rounded-full ${isDark ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'}`}
            >
              +{missing_skills.length - 6} more
            </span>
          )}
        </div>
      </div>

      {partial_matches.length > 0 && (
        <div
          className={`border rounded-lg p-4 ${isDark ? 'bg-yellow-900/30 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}
        >
          <h4 className={`font-medium mb-2 ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
            <IoFlashOutline size={20} className="inline mr-1 align-text-bottom" />
            Partial Matches ({partial_matches.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {partial_matches.slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-sm rounded-full ${isDark ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const SkillsTab = ({ resumeSkills, jobSkills, matched_skills, missing_skills, partial_matches }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <SkillsList title="Your Resume Skills" skills={resumeSkills} matchedSkills={matched_skills} partialMatches={partial_matches} />
    <SkillsList
      title="Job Requirements"
      skills={jobSkills}
      matchedSkills={matched_skills}
      missingSkills={missing_skills}
      partialMatches={partial_matches}
      showStatus={true}
    />
  </div>
);

export default ResultsDashboard;
