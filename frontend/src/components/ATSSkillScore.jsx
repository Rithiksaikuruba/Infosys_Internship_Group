import React from 'react';

const getColor = (score) => {
  if (score > 80) return '#22c55e'; // green
  if (score > 60) return '#eab308'; // yellow
  if (score > 40) return '#fb923c'; // orange
  return '#ef4444'; // red
};

const ATSSkillScore = ({ score, matched, total }) => (
  <div className="flex flex-col items-center justify-center p-7 rounded-2xl shadow-lg bg-white">
    <svg width="150" height="150" className="mb-4">
      <circle
        cx="75"
        cy="75"
        r="66"
        stroke="#e5e7eb"
        strokeWidth="12"
        fill="none"
      />
      <circle
        cx="75"
        cy="75"
        r="66"
        stroke={getColor(score)}
        strokeWidth="12"
        fill="none"
        strokeDasharray={2 * Math.PI * 66}
        strokeDashoffset={2 * Math.PI * 66 - (2 * Math.PI * 66 * score) / 100}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.7s' }}
      />
      <text x="75" y="90" textAnchor="middle" fontSize="40" fill={getColor(score)} fontWeight="bold">
        {score}%
      </text>
    </svg>
    <div className="text-lg font-bold mb-1 text-gray-800">ATS Score</div>
    <div className="text-xs text-gray-500 mb-1">{matched} / {total} keywords matched</div>
    <div className="text-xs text-gray-600 font-medium">Resume matches job description keywords</div>
  </div>
);

export default ATSSkillScore;
