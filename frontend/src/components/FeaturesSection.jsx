import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import MockInterview from "./MockInterview";

const roundsData = {
  product: [
    {
      title: "Online Coding Test",
      description: "Solve DSA and algorithm problems like Google, Microsoft, Amazon.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10l6 6 6-6" />
        </svg>
      ),
    },
    {
      title: "Technical Interviews",
      description: "Face 2–3 rounds of technical interviews focused on core concepts and implementation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3-3 3 3m0 6l-3 3-3-3" />
        </svg>
      ),
    },
    {
      title: "System Design Round",
      description: "Design scalable systems and architecture relevant to the product domain.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-4 4m0-4l4 4"/>
        </svg>
      ),
    },
    {
      title: "HR Round",
      description: "Finalize with HR questions to understand culture fit and expectations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14v7" />
        </svg>
      ),
    },
  ],
  service: [
    {
      title: "Aptitude Test",
      description: "Includes quant, reasoning, and verbal aptitude questions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polygon points="3 11 11 4 19 11 11 19 3 11" stroke="currentColor" strokeWidth={2}/>
        </svg>
      ),
    },
    {
      title: "Basic Programming Test",
      description: "Solve simple coding problems using C, Java, Python, or SQL.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 19l8-14M6 5h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Technical Interview",
      description: "One round technical interview focusing on problem-solving.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth={2}/>
          <path d="M8 21h8" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: "HR Round",
      description: "Culture fit and general discussion to finalize the process.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none"/>
          <path d="M12 14v-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
          <path d="M14 12h-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
        </svg>
      ),
    },
  ],
  startup: [
    {
      title: "Project/Resume Discussion",
      description: "Discuss your projects and resume experience in-depth.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
          <path d="M8 12h8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <path d="M12 8v8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Technical Interview",
      description: "Problem-solving and case studies related to startup challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polygon points="7 7 17 12 7 17 7 7" stroke="currentColor" strokeWidth={2}/>
        </svg>
      ),
    },
    {
      title: "Culture Fit Round",
      description: "Assess how well you fit the startup’s culture and dynamic environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.342 6.669L12 14z"/>
        </svg>
      ),
    },
    {
      title: "(Optional) Founder/Manager Round",
      description: "Meet with founders or managers for final alignment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12-3v6m-3-3l-3 3-3-3"/>
        </svg>
      ),
    },
  ],
};

const FeaturesSection = () => {
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState(null);
  const [showInterview, setShowInterview] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setShowInterview(false);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 my-12" id="features">
      <h2 className={`text-4xl font-extrabold mb-8 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
        Personalized Mock Interview
      </h2>
      <div className="flex justify-center space-x-6 mb-8">
        {["product", "service", "startup"].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selectedType === type
                ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}-Based
          </button>
        ))}
      </div>

      {!showInterview && selectedType && (
        <>
          <div className="grid gap-8 md:grid-cols-2">
            {roundsData[selectedType].map(({ title, description, icon }, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${isDark ? "bg-gray-800" : "bg-white"}`}
                role="region"
                aria-labelledby={`round-title-${idx}`}
                tabIndex="0"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full mr-5">
                    {icon}
                  </div>
                  <h3 id={`round-title-${idx}`} className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => setShowInterview(true)}
            >
              Start Mock Interview
            </button>
          </div>
        </>
      )}

      {showInterview && selectedType && (
        <div className="mt-8">
          <MockInterview initialCompanyType={selectedType} />
        </div>
      )}
    </section>
  );
};

export default FeaturesSection;
