import React, { useState } from 'react';

const SkillsList = ({ 
  title, 
  skills, 
  matchedSkills = [], 
  missingSkills = [], 
  partialMatches = [], 
  showStatus = false 
}) => {
  const [showAll, setShowAll] = useState(false);
  const displaySkills = showAll ? skills : skills.slice(0, 10);

  const getSkillStatus = (skill) => {
    if (matchedSkills.includes(skill)) {
      return { status: 'matched', color: 'green', icon: '✅' };
    } else if (partialMatches.includes(skill)) {
      return { status: 'partial', color: 'yellow', icon: '⚡' };
    } else if (missingSkills.includes(skill)) {
      return { status: 'missing', color: 'red', icon: '❌' };
    }
    return { status: 'neutral', color: 'gray', icon: '' };
  };

  const skillsByCategory = {
    matched: skills.filter(skill => matchedSkills.includes(skill)),
    partial: skills.filter(skill => partialMatches.includes(skill)),
    missing: skills.filter(skill => missingSkills.includes(skill)),
    neutral: skills.filter(skill => 
      !matchedSkills.includes(skill) && 
      !partialMatches.includes(skill) && 
      !missingSkills.includes(skill)
    )
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      {showStatus ? (
        <div className="space-y-4">
          {skillsByCategory.matched.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-2">
                ✅ Matched ({skillsByCategory.matched.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.matched.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skillsByCategory.partial.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                ⚡ Partial Match ({skillsByCategory.partial.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.partial.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skillsByCategory.missing.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-2">
                ❌ Missing ({skillsByCategory.missing.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.missing.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skillsByCategory.neutral.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Other Skills ({skillsByCategory.neutral.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.neutral.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {displaySkills.map((skill, index) => {
              const skillInfo = getSkillStatus(skill);
              const colorClasses = {
                green: 'bg-green-100 text-green-800 border-green-200',
                yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                red: 'bg-red-100 text-red-800 border-red-200',
                gray: 'bg-gray-100 text-gray-800 border-gray-200'
              };

              return (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${colorClasses[skillInfo.color]}`}
                >
                  {skillInfo.icon && <span className="mr-1">{skillInfo.icon}</span>}
                  {skill}
                </span>
              );
            })}
          </div>

          {skills.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showAll ? 'Show Less' : `Show All (${skills.length})`}
            </button>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Total: {skills.length} skills
      </div>
    </div>
  );
};

export default SkillsList;