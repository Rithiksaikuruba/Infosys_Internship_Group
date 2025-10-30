// frontend/src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserResumeScores } from '../services/api';
import { Link } from 'react-router-dom';
import { 
  FiFileText, 
  FiCalendar, 
  FiAlertTriangle, 
  FiInfo, 
  FiInbox, 
  FiLoader 
} from 'react-icons/fi';

// --- Helper Components for UI States ---

/**
 * A loading spinner component.
 */
const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center h-64 text-gray-600">
    <FiLoader className="animate-spin text-4xl text-indigo-600" />
    <p className="mt-3 text-lg">Loading your scores...</p>
  </div>
);

/**
 * An alert block for errors or info messages.
 */
const InfoBlock = ({ message, type = 'info' }) => {
  const isError = type === 'error';
  const colors = isError
    ? 'bg-red-50 border-red-400 text-red-700'
    : 'bg-blue-50 border-blue-400 text-blue-700';
  const Icon = isError ? FiAlertTriangle : FiInfo;

  return (
    <div className={`max-w-3xl mx-auto mt-12 p-4 border-l-4 rounded-md ${colors}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="ml-3">
          <p className="font-medium">{isError ? 'Error' : 'Notice'}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * A "call to action" component for when no scores are found.
 */
const EmptyState = () => (
  <div className="text-center mt-12 p-10 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
    <FiInbox className="mx-auto w-16 h-16 text-gray-400" />
    <h2 className="mt-4 text-2xl font-semibold text-gray-800">No Analyses Found</h2>
    <p className="mt-2 text-gray-600">You haven't analyzed any resumes yet.</p>
    <Link
      to="/upload-resume" // <-- **ADJUST THIS**: Set to your resume upload/analysis page route
      className="mt-6 inline-block bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
    >
      Analyze Your First Resume
    </Link>
  </div>
);

// --- Color Helper Functions ---

/**
 * Gets a text color class based on the score.
 */
const getScoreColor = (score) => {
  if (score == null) return 'text-gray-500';
  if (score < 50) return 'text-red-600';
  if (score < 80) return 'text-yellow-600';
  return 'text-green-600';
};

/**
 * Gets a background color class for the progress bar.
 */
const getScoreProgressColor = (score) => {
  if (score == null) return 'bg-gray-300';
  if (score < 50) return 'bg-red-500';
  if (score < 80) return 'bg-yellow-500';
  return 'bg-green-600';
};

// --- Main Dashboard Component ---

const Dashboard = () => {
  const { user } = useAuth();
  const [resumeScores, setResumeScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const userId = user?.id || user?.user_id || user?._id;
      if (!user || !userId) {
        setResumeScores([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getUserResumeScores(userId);
        const sortedData = (Array.isArray(data) ? data : (data?.scores || []))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setResumeScores(sortedData);
      } catch (e) {
        console.error(e);
        setError('Failed to load resume scores. Please try again later.');
        setResumeScores([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  // Handle loading, error, and no-user states
  if (!user) return <InfoBlock message="Please login to view your resume scores." />;
  if (loading) return <LoadingSpinner />;
  if (error) return <InfoBlock message={error} type="error" />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Resume Dashboard</h1>
        <p className="mt-1 text-gray-600">View and manage all your past resume analyses.</p>
      </div>

      {/* Main Content Area */}
      {!resumeScores.length ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeScores.map((entry) => {
            const scoreId = entry.id || entry._id || entry.filename + entry.date; // Stable key
            const scoreColor = getScoreColor(entry.score);
            const progressColor = getScoreProgressColor(entry.score);

            return (
              <Link
                key={scoreId}
                // **ADJUST THIS**: Set to your route for viewing a single analysis report
                to={`/analysis/${scoreId}`} 
                className="block bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50"
              >
                <div className="p-5">
                  {/* Card Header: Filename */}
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mr-3">
                      <FiFileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2
                      className="text-base font-semibold text-gray-800 truncate"
                      title={entry.filename || 'Unnamed Resume'}
                    >
                      {entry.filename || 'Unnamed Resume'}
                    </h2>
                  </div>

                  {/* Card Body: Score & Progress */}
                  <div className="my-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-gray-600">Overall Score</span>
                      <span className={`text-2xl font-bold ${scoreColor}`}>
                        {entry.score != null ? `${entry.score}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{ width: `${entry.score || 0}%` }}
                        role="progressbar"
                        aria-valuenow={entry.score || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>

                  {/* Card Footer: Date */}
                  <div className="flex justify-start items-center text-sm text-gray-500 border-t border-gray-100 pt-3 mt-4">
                    <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {entry.date ? new Date(entry.date).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;