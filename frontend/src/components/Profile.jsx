import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FiUser,
  FiBell,
  FiLogOut,
  FiGithub,
  FiLinkedin,
  FiSave,
  FiX,
  FiLoader,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiExternalLink,
  FiTarget,
  FiFileText,
  FiAward,
  FiClock,
  FiTrendingUp,
  FiBookmark,
  FiFilter,
  FiAlertCircle,
} from "react-icons/fi";

// --- Profile Settings Component ---
const ProfileSettings = ({ user, onProfileUpdate }) => {
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "This is a placeholder bio. Tell us a bit about yourself!",
    githubUrl: user.githubUrl || "",
    linkedinUrl: user.linkedinUrl || "",
    targetRole: user.targetRole || "",
    yearsOfExperience: user.yearsOfExperience || "",
    currentLocation: user.currentLocation || "",
    preferredLocations: user.preferredLocations || "",
    expectedSalary: user.expectedSalary || "",
    skills: user.skills || "",
    resumeUrl: user.resumeUrl || "",
    portfolioUrl: user.portfolioUrl || "",
    jobType: user.jobType || "Full-time",
    remotePreference: user.remotePreference || "hybrid",
    industry: user.industry || "",
    certifications: user.certifications || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onProfileUpdate) {
        onProfileUpdate(formData);
      }
      alert("Profile updated successfully! Job recommendations will be refreshed.");
    }, 1500);
  };

  const inputClass = `mt-1 block w-full px-3 py-2.5 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDark
      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600 focus:border-blue-500"
      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500"
  }`;

  const sectionHeadingClass = `text-lg font-semibold flex items-center border-b pb-3 mb-4 ${
    isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
  }`;

  return (
    <div
      className={`shadow-xl rounded-xl overflow-hidden transition-colors ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className={`px-6 py-5 border-b ${
          isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <h3
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Profile Settings
        </h3>
        <p
          className={`mt-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Complete your profile to get personalized job recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-5">
            <h4 className={sectionHeadingClass}>
              <FiUser className="mr-2 opacity-80" />
              Basic Information
            </h4>

            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                disabled
                className={`mt-1 block w-full px-3 py-2.5 rounded-lg shadow-sm cursor-not-allowed ${
                  isDark
                    ? "bg-gray-700/50 border border-gray-600 text-gray-400"
                    : "bg-gray-100 border border-gray-300 text-gray-500"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Professional Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe your professional background..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Job Preferences */}
          <div
            className={`space-y-5 pt-6 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className={sectionHeadingClass}>
              <FiTarget className="mr-2 opacity-80" />
              Job Preferences
            </h4>

            <div>
              <label
                htmlFor="targetRole"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Target Role / Job Title *
              </label>
              <input
                type="text"
                name="targetRole"
                id="targetRole"
                required
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Data Analyst"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="yearsOfExperience"
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  required
                  min="0"
                  max="50"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="currentLocation"
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Current Location *
                </label>
                <select
                  name="currentLocation"
                  id="currentLocation"
                  required
                  value={formData.currentLocation}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                  <option value="India">All India</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="skills"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Skills (comma-separated) *
              </label>
              <textarea
                name="skills"
                id="skills"
                rows="2"
                required
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, Python, SQL"
                className={inputClass}
              />
            </div>
          </div>

          {/* Professional Links */}
          <div
            className={`space-y-5 pt-6 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className={sectionHeadingClass}>
              <FiExternalLink className="mr-2 opacity-80" />
              Professional Links
            </h4>

            <div className="relative">
              <label
                htmlFor="resumeUrl"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Resume URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFileText className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="url"
                  name="resumeUrl"
                  id="resumeUrl"
                  required
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-resume"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="linkedinUrl"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                LinkedIn *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLinkedin className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="url"
                  name="linkedinUrl"
                  id="linkedinUrl"
                  required
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="githubUrl"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                GitHub (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGithub className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="url"
                  name="githubUrl"
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="portfolioUrl"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Portfolio URL (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiExternalLink className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="url"
                  name="portfolioUrl"
                  id="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div
            className={`space-y-5 pt-6 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h4 className={sectionHeadingClass}>
              <FiAward className="mr-2 opacity-80" />
              Additional Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="jobType"
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Job Type
                </label>
                <select
                  name="jobType"
                  id="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="remotePreference"
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Work Preference
                </label>
                <select
                  name="remotePreference"
                  id="remotePreference"
                  value={formData.remotePreference}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="expectedSalary"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Expected Salary (Annual, in Lakhs)
              </label>
              <input
                type="text"
                name="expectedSalary"
                id="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g., 10-15 LPA"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="industry"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Industry/Domain
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., Fintech, Healthcare, E-commerce"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="certifications"
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Certifications (comma-separated)
              </label>
              <textarea
                name="certifications"
                id="certifications"
                rows="2"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="e.g., AWS Certified, Google Cloud, Scrum Master"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div
          className={`px-6 py-4 border-t flex justify-end gap-3 ${
            isDark
              ? "bg-gray-800/50 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <button
            type="button"
            className={`px-5 py-2.5 border text-sm font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              isDark
                ? "border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-900"
                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            }`}
          >
            <FiX className="inline -ml-1 mr-2 h-5 w-5" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isDark ? "focus:ring-offset-gray-900" : ""
            }`}
          >
            {isSubmitting ? (
              <FiLoader className="inline animate-spin -ml-1 mr-2 h-5 w-5" />
            ) : (
              <FiSave className="inline -ml-1 mr-2 h-5 w-5" />
            )}
            {isSubmitting ? "Saving..." : "Save & Search Jobs"}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Job Search Component ---
const JobSearch = ({ user }) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState(user.targetRole || "");
  const [locationFilter, setLocationFilter] = useState(user.currentLocation || "");
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [matchScores, setMatchScores] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiStatus, setApiStatus] = useState("configured");

  const calculateMatchScore = (job, userProfile) => {
    let score = 0;

    if (!userProfile.skills || !userProfile.targetRole) return 50;

    const userSkills = userProfile.skills
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());
    const jobDescription = (job.description || "").toLowerCase();
    const jobTitle = (job.title || "").toLowerCase();

    const matchingSkills = userSkills.filter(
      (skill) => jobDescription.includes(skill) || jobTitle.includes(skill)
    );
    score += (matchingSkills.length / userSkills.length) * 40;

    const targetRole = userProfile.targetRole.toLowerCase();
    if (jobTitle.includes(targetRole)) {
      score += 30;
    } else if (targetRole.split(" ").some((word) => jobTitle.includes(word))) {
      score += 15;
    }

    const jobLocation = (
      job.location?.display_name ||
      job.location?.area?.join(", ") ||
      ""
    ).toLowerCase();
    const userLocation = (userProfile.currentLocation || "").toLowerCase();

    if (jobLocation.includes(userLocation) || userLocation === "india") {
      score += 15;
    }

    if (job.salary_min || job.salary_max) {
      score += 10;
    }

    const created = new Date(job.created);
    const daysSincePosted = (Date.now() - created) / (1000 * 60 * 60 * 24);
    if (daysSincePosted <= 7) {
      score += 5;
    } else if (daysSincePosted <= 30) {
      score += 3;
    }

    return Math.min(Math.round(score), 100);
  };

  const fetchJobsFromAdzuna = async (query, location) => {
    try {
      const APP_ID = "1fa2dcaa";
      const APP_KEY = "4b09375af70f1e4ac146ff5b9bbee484";

      const searchQuery = query || user.targetRole || "software developer";
      const searchLocation = location || user.currentLocation || "bangalore";

      const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=50&what=${encodeURIComponent(
        searchQuery
      )}&where=${encodeURIComponent(searchLocation)}&content-type=application/json`;

      console.log("Fetching from Adzuna:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Adzuna API error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Adzuna response:", data);

      if (data.results && data.results.length > 0) {
        setApiStatus("configured");

        const transformedJobs = data.results.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company?.display_name || "Company Name Not Listed",
          location: job.location,
          description: job.description,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          created: job.created,
          redirect_url: job.redirect_url,
          contract_type: job.contract_type,
        }));

        const scores = {};
        transformedJobs.forEach((job) => {
          scores[job.id] = calculateMatchScore(job, user);
        });

        setMatchScores(scores);
        const sortedJobs = transformedJobs.sort(
          (a, b) => scores[b.id] - scores[a.id]
        );

        setJobs(sortedJobs);
        setErrorMessage("");
        return true;
      } else {
        console.log("No results from Adzuna");
        throw new Error("No jobs found");
      }
    } catch (error) {
      console.error("Adzuna API Error:", error);
      return false;
    }
  };

  const fetchJobsFromJSearch = async (query, location) => {
    try {
      const RAPID_API_KEY = "bbe73ea675msh6f061b7379cd2e2p1beebjsnb8b3d2c7fe3f";

      const searchQuery = `${
        query || user.targetRole || "software developer"
      } in ${location || user.currentLocation || "India"}`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        searchQuery
      )}&page=1&num_pages=1&date_posted=all`;

      console.log("Fetching from JSearch:", searchQuery);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`JSearch API error: ${response.status}`);
      }

      const data = await response.json();

      console.log("JSearch response:", data);

      if (data.data && data.data.length > 0) {
        setApiStatus("configured");

        const transformedJobs = data.data.map((job) => ({
          id: job.job_id,
          title: job.job_title,
          company: job.employer_name,
          location: {
            display_name: `${job.job_city || ""}, ${job.job_state || ""}, ${
              job.job_country || ""
            }`.replace(/(^, |, $|, , )/g, ""),
          },
          description: job.job_description,
          salary_min: job.job_min_salary,
          salary_max: job.job_max_salary,
          created: job.job_posted_at_datetime_utc,
          redirect_url: job.job_apply_link,
          contract_type: job.job_employment_type,
        }));

        const scores = {};
        transformedJobs.forEach((job) => {
          scores[job.id] = calculateMatchScore(job, user);
        });

        setMatchScores(scores);
        const sortedJobs = transformedJobs.sort(
          (a, b) => scores[b.id] - scores[a.id]
        );

        setJobs(sortedJobs);
        setErrorMessage("");
        return true;
      } else {
        console.log("No results from JSearch");
        throw new Error("No jobs found");
      }
    } catch (error) {
      console.error("JSearch API Error:", error);
      return false;
    }
  };

  const fetchRealTimeJobs = async (query, location) => {
    setIsSearching(true);
    setErrorMessage("");
    setJobs([]);

    console.log("Starting job search for:", query, "in", location);

    const adzunaSuccess = await fetchJobsFromAdzuna(query, location);

    if (!adzunaSuccess) {
      console.log("Adzuna failed, trying JSearch...");
      const jsearchSuccess = await fetchJobsFromJSearch(query, location);

      if (!jsearchSuccess) {
        setApiStatus("error");
        setErrorMessage(
          "Unable to fetch jobs. Please try again later or try a different search term."
        );
        setJobs([]);
      }
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (user.targetRole && user.currentLocation) {
      fetchRealTimeJobs(user.targetRole, user.currentLocation);
    } else {
      setErrorMessage(
        "Please complete your profile (Target Role & Location) in the Profile tab to search for jobs."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (!searchQuery || !locationFilter) {
      setErrorMessage("Please enter both job title and location to search.");
      return;
    }
    fetchRealTimeJobs(searchQuery, locationFilter);
  };

  const handleApply = (job) => {
    window.open(job.redirect_url, "_blank", "noopener,noreferrer");
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getMatchBadgeColor = (score) => {
    if (score >= 80)
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800";
    if (score >= 60)
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800";
    if (score >= 40)
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800";
    return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600";
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return null;
    const formatValue = (val) => {
      if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
      return `₹${(val / 1000).toFixed(0)}K`;
    };
    if (min && max) return `${formatValue(min)} - ${formatValue(max)}`;
    if (min) return `From ${formatValue(min)}`;
    if (max) return `Up to ${formatValue(max)}`;
  };

  const displayJobs = showSavedOnly
    ? jobs.filter((job) => savedJobs.includes(job.id))
    : jobs;

  const inputSearchClass = `w-full px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDark
      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600 focus:border-blue-500"
      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500"
  }`;

  return (
    <div className="space-y-6">
      <div
        className={`shadow-xl rounded-xl p-6 transition-colors ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Search Real Jobs from Company Career Pages in India
        </h3>

        {(!user.targetRole || !user.currentLocation) && (
          <div
            className={`mb-4 p-4 border rounded-lg ${
              isDark
                ? "bg-yellow-900/20 border-yellow-800"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-yellow-200" : "text-yellow-800"
              }`}
            >
              <FiTarget className="inline mr-2" />
              <strong>Complete your profile</strong> - Add Target Role and
              Location in the Profile tab to start searching.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Job title (e.g., Software Engineer)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className={inputSearchClass}
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={inputSearchClass}
          >
            <option value="">Select Location</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi / NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="India">All India</option>
          </select>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery || !locationFilter}
            className={`w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 font-medium ${
              isDark ? "focus:ring-offset-gray-800" : ""
            }`}
          >
            {isSearching ? (
              <>
                <FiLoader className="inline animate-spin mr-2" />
                Searching...
              </>
            ) : (
              <>
                <FiBriefcase className="inline mr-2" />
                Search Real Jobs
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showSavedOnly
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                : isDark
                ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            <FiBookmark className="mr-2" />
            Saved Jobs ({savedJobs.length})
          </button>

          <div
            className={`text-sm font-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {jobs.length} jobs found
          </div>
        </div>

        {user.targetRole && user.currentLocation && jobs.length > 0 && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              isDark ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-green-200" : "text-green-800"
              }`}
            >
              <FiFilter className="inline mr-2" />
              <strong>Showing:</strong> {user.targetRole} jobs in{" "}
              {user.currentLocation}
            </p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div
          className={`border rounded-lg p-4 ${
            isDark
              ? "bg-yellow-900/20 border-yellow-800"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <p
            className={`text-sm ${
              isDark ? "text-yellow-200" : "text-yellow-800"
            }`}
          >
            <FiAlertCircle className="inline mr-2" />
            {errorMessage}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {isSearching ? (
          <div
            className={`shadow-xl rounded-xl p-12 text-center flex flex-col items-center ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FiLoader className="inline-block text-4xl text-blue-500 animate-spin mb-4" />
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Searching real job listings from Indian companies...
            </p>
          </div>
        ) : displayJobs.length === 0 ? (
          <div
            className={`shadow-xl rounded-xl p-12 text-center flex flex-col items-center ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FiBriefcase
              className={`text-4xl mb-4 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {showSavedOnly
                ? "No saved jobs yet."
                : errorMessage
                ? "Try adjusting your search criteria."
                : "Complete your profile to see jobs."}
            </p>
          </div>
        ) : (
          displayJobs.map((job) => {
            const matchScore = matchScores[job.id] || 50;
            const isSaved = savedJobs.includes(job.id);
            const salary = formatSalary(job.salary_min, job.salary_max);

            return (
              <div
                key={job.id}
                className={`shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-200 border-l-4 ${
                  isDark ? "bg-gray-800 border-r border-t border-b border-gray-700/50" : "bg-white border-r border-t border-b border-gray-200"
                }`}
                style={{
                  borderLeftColor:
                    matchScore >= 80
                      ? "#10b981"
                      : matchScore >= 60
                      ? "#3b82f6"
                      : matchScore >= 40
                      ? "#f59e0b"
                      : "#6b7280",
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {job.title}
                        </h4>
                        <p
                          className={`text-md mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {job.company}
                        </p>
                      </div>

                      <div className="ml-4">
                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-bold ${getMatchBadgeColor(
                            matchScore
                          )}`}
                        >
                          {matchScore}% Match
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-sm mt-3 line-clamp-3 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {job.description?.substring(0, 200)}...
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4 text-sm">
                      <span
                        className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${
                          isDark
                            ? "bg-gray-700/80 text-gray-300 border border-gray-600"
                            : "bg-gray-50 text-gray-700 border border-gray-200"
                        }`}
                      >
                        <FiMapPin className="w-4 h-4 mr-1.5" />
                        {job.location?.display_name ||
                          job.location?.area?.join(", ") ||
                          "Location not specified"}
                      </span>

                      {salary && (
                        <span
                          className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${
                            isDark
                              ? "bg-gray-700/80 text-gray-300 border border-gray-600"
                              : "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <FiDollarSign className="w-4 h-4 mr-1.5" />
                          {salary}
                        </span>
                      )}

                      {job.contract_type && (
                        <span
                          className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${
                            isDark
                              ? "bg-gray-700/80 text-gray-300 border border-gray-600"
                              : "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <FiBriefcase className="w-4 h-4 mr-1.5" />
                          {job.contract_type}
                        </span>
                      )}

                      {job.created && (
                        <span
                          className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${
                            isDark
                              ? "bg-gray-700/80 text-gray-300 border border-gray-600"
                              : "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <FiClock className="w-4 h-4 mr-1.5" />
                          {new Date(job.created).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {matchScore >= 60 && (
                      <div
                        className={`mt-4 p-3 rounded-lg ${
                          isDark
                            ? "bg-green-900/20 border border-green-800"
                            : "bg-green-50 border border-green-200"
                        }`}
                      >
                        <p
                          className={`text-xs flex items-center ${
                            isDark ? "text-green-200" : "text-green-800"
                          }`}
                        >
                          <FiTrendingUp className="inline mr-2" />
                          <strong>Great match!</strong> This job aligns with
                          your profile
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2.5 rounded-lg transition-all duration-200 border ${
                        isSaved
                          ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                          : isDark
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
                      }`}
                    >
                      <FiBookmark className={isSaved ? "fill-current" : ""} />
                    </button>

                    <button
                      onClick={() => handleApply(job)}
                      className={`px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium ${
                        isDark ? "focus:ring-offset-gray-800" : ""
                      }`}
                    >
                      Apply
                      <FiExternalLink className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Notification Settings
const NotificationSettings = () => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    instantAlerts: false,
    weeklyDigest: true,
    applicationUpdates: true,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const ToggleSwitch = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <label
          htmlFor={id}
          className={`block text-md font-medium ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {label}
        </label>
        <p
          className={`text-sm mt-1 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange({ target: { name: id, checked: !checked } })}
        className={`${
          checked ? "bg-blue-600" : isDark ? "bg-gray-600" : "bg-gray-300"
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isDark ? "focus:ring-offset-gray-800" : ""
        }`}
      >
        <span
          className={`${
            checked ? "translate-x-5" : "translate-x-0"
          } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );

  return (
    <div
      className={`shadow-xl rounded-xl overflow-hidden transition-colors ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className={`px-6 py-5 border-b ${
          isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <h3
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Notifications
        </h3>
        <p
          className={`mt-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Manage how you receive job alerts and updates.
        </p>
      </div>
      <div className="p-6 divide-y divide-gray-700">
        <ToggleSwitch
          id="jobAlerts"
          label="New Job Matches"
          description="Get notified when new jobs match your profile."
          checked={notifications.jobAlerts}
          onChange={handleToggle}
        />
        <ToggleSwitch
          id="instantAlerts"
          label="Instant Alerts"
          description="Real-time notifications for 80%+ matches."
          checked={notifications.instantAlerts}
          onChange={handleToggle}
        />
        <ToggleSwitch
          id="weeklyDigest"
          label="Weekly Digest"
          description="Weekly summary of top matches."
          checked={notifications.weeklyDigest}
          onChange={handleToggle}
        />
        <ToggleSwitch
          id="applicationUpdates"
          label="Application Status"
          description="Updates about your applications."
          checked={notifications.applicationUpdates}
          onChange={handleToggle}
        />
      </div>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const { isDark } = useTheme();
  const { user: authUser, logout, loading } = useAuth();
  const [user, setUser] = useState(authUser);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const handleProfileUpdate = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    setTimeout(() => {
      setActiveTab("jobs");
    }, 2000);
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <FiLoader className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`text-center p-8 rounded-xl shadow-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Access Denied
          </h2>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Please log in to search for jobs.
          </p>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon: Icon, badge }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            : isDark
            ? "text-gray-300 hover:bg-gray-700 border border-transparent"
            : "text-gray-700 hover:bg-gray-100 border border-transparent"
        }`}
      >
        <span className="flex items-center">
          <Icon className="h-5 w-5 mr-3" />
          <span>{label}</span>
        </span>
        {badge && (
          <span
            className={`ml-2 px-2 py-0.5 text-xs font-bold rounded-full ${
              badge === "!"
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  const calculateProfileCompleteness = () => {
    const requiredFields = [
      "targetRole",
      "skills",
      "currentLocation",
      "resumeUrl",
      "linkedinUrl",
    ];
    const completedFields = requiredFields.filter((field) => user[field]);
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-4xl font-bold tracking-tight mb-10 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Career Dashboard
        </h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div
              className={`shadow-xl rounded-xl p-6 mb-6 transition-colors ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-4">
                {user.avatarUrl ? (
                  <img
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-500"
                    src={user.avatarUrl}
                    alt="Profile"
                  />
                ) : (
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full ring-2 ${
                      isDark ? "bg-gray-700 ring-blue-500" : "bg-gray-200 ring-blue-500"
                    }`}
                  >
                    <FiUser
                      className={`h-8 w-8 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </span>
                )}
                <div className="flex-1">
                  <h2
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.name}
                  </h2>
                  <p
                    className={`text-sm truncate ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.email}
                  </p>
                  {user.targetRole && (
                    <p
                      className={`text-xs mt-1 flex items-center font-medium ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <FiTarget className="mr-1" />
                      {user.targetRole}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`mt-5 pt-5 border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Profile Strength
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {profileCompleteness}%
                  </span>
                </div>
                <div
                  className={`w-full rounded-full h-2.5 ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      profileCompleteness >= 80
                        ? "bg-green-600"
                        : profileCompleteness >= 50
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                    }`}
                    style={{ width: `${profileCompleteness}%` }}
                  />
                </div>
              </div>
            </div>

            <nav
              className={`shadow-xl rounded-xl p-4 space-y-1 transition-colors ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <TabButton
                id="profile"
                label="Profile"
                icon={FiUser}
                badge={profileCompleteness < 100 ? "!" : null}
              />
              <TabButton
                id="jobs"
                label="Find Real Jobs"
                icon={FiBriefcase}
              />
              <TabButton
                id="notifications"
                label="Notifications"
                icon={FiBell}
              />
              <hr
                className={`my-2 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              />
              <button
                onClick={logout}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isDark
                    ? "text-red-400 hover:bg-red-900/30 border border-transparent hover:border-red-800"
                    : "text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200"
                }`}
              >
                <FiLogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-8 xl:col-span-9 mt-6 lg:mt-0">
            {activeTab === "profile" && (
              <ProfileSettings
                user={user}
                onProfileUpdate={handleProfileUpdate}
              />
            )}
            {activeTab === "jobs" && <JobSearch user={user} />}
            {activeTab === "notifications" && <NotificationSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
