import React, { useState } from 'react';

const RecommendationsList = ({ recommendations }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200'
  };

  const priorityIcons = {
    High: '🔥',
    Medium: '⚡',
    Low: '💡'
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎉</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Perfect Match!</h3>
        <p className="text-gray-600">
          You have all the required skills for this position. Keep up the great work!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Learning Recommendations ({recommendations.length})
        </h3>
        <div className="text-sm text-gray-500">
          Prioritized by importance and difficulty
        </div>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{rec.skill}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[rec.priority]}`}>
                      {priorityIcons[rec.priority]} {rec.priority} Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <div className="font-medium text-gray-900">{rec.category}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Difficulty:</span>
                      <div className="font-medium text-gray-900">{rec.difficulty}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Est. Time:</span>
                      <div className="font-medium text-gray-900">{rec.estimated_time}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Resources:</span>
                      <div className="font-medium text-gray-900">{rec.resources.length}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedItem === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Learning Resources Preview */}
              <div className="flex flex-wrap gap-2">
                {rec.resources.slice(0, 3).map((resource, resourceIndex) => (
                  <a
                    key={resourceIndex}
                    href={resource.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {resource.free && <span className="mr-1 text-green-600">🆓</span>}
                    {resource.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedItem === index && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Learning Resources */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">📚 Learning Resources</h5>
                    <div className="space-y-3">
                      {rec.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900 text-sm">{resource.name}</h6>
                              <p className="text-xs text-gray-500 mt-1">{resource.type}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-3">
                              {resource.free ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Free</span>
                              ) : (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Paid</span>
                              )}
                              <a
                                href={resource.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 text-sm"
                              >
                                Visit →
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Tips */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">💡 Learning Tips</h5>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <ul className="space-y-2 text-sm text-gray-700">
                        {rec.learning_tips?.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2 flex-shrink-0 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;