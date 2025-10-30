import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, FileText, Briefcase, Target } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const Signup = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        fullname,
        email,
        password,
      });
      setSuccess(response.data.message || "Signup successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Signup failed. Try again."
      );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 opacity-10 animate-float ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          <FileText size={60} />
        </div>
        <div className={`absolute bottom-32 right-16 opacity-10 animate-float-delayed ${isDark ? "text-purple-400" : "text-purple-600"}`}>
          <Briefcase size={50} />
        </div>
        <div className={`absolute top-1/2 right-1/4 opacity-10 animate-float-slow ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
          <Target size={45} />
        </div>
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${isDark ? "bg-blue-500" : "bg-blue-300"}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${isDark ? "bg-purple-500" : "bg-purple-300"}`}></div>
      </div>

      {/* Card */}
      <div className={`w-full max-w-md rounded-3xl shadow-2xl p-8 mx-4 transition-all duration-300 border backdrop-blur-xl relative z-10 transform hover:scale-[1.02] ${isDark ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-500/10' : 'bg-white/90 border-gray-200 shadow-indigo-200/50'}`}>
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'} shadow-lg transform transition-transform hover:rotate-6`}>
            <FileText className="text-white" size={32} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${isDark ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent`}>
            Create an Account
          </h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-7`}>
            Sign up to get started
          </p>
        </div>
        {error && (
          <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 font-semibold">{error}</div>
        )}
        {success && (
          <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700 font-semibold">{success}</div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="group">
            <label className={`block mb-1 font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>Full Name</label>
            <div className="relative">
              <User className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={`pl-11 pr-3 py-3 border rounded-xl w-full placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-700/60 text-gray-100 border-gray-600 focus:ring-blue-500/50 focus:border-blue-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"}`}
                placeholder="Your Name"
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="group">
            <label className={`block mb-1 font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>Email</label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-11 pr-3 py-3 border rounded-xl w-full placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-700/60 text-gray-100 border-gray-600 focus:ring-blue-500/50 focus:border-blue-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"}`}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          {/* Password */}
          <div className="group">
            <label className={`block mb-1 font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>Password</label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-11 pr-3 py-3 border rounded-xl w-full placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-700/60 text-gray-100 border-gray-600 focus:ring-blue-500/50 focus:border-blue-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"}`}
                placeholder="Password"
                required
              />
            </div>
          </div>
          {/* Confirm Password */}
          <div className="group">
            <label className={`block mb-1 font-semibold text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>Confirm Password</label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`pl-11 pr-3 py-3 border rounded-xl w-full placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-700/60 text-gray-100 border-gray-600 focus:ring-blue-500/50 focus:border-blue-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"}`}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-blue-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-blue-500/30'}`}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        {/* Divider */}
        <div className="relative my-6">
          <div className={`absolute inset-0 flex items-center ${isDark ? "text-gray-700" : "text-gray-300"}`}>
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 ${isDark ? "bg-gray-800/80 text-gray-400" : "bg-white/90 text-gray-500"}`}>
              Already have an account?
            </span>
          </div>
        </div>
        <div className={`text-center`}>
          <Link
            to="/login"
            className={`${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} font-medium`}
          >
            Sign in
          </Link>
        </div>
        {/* Feature Highlights */}
        <div className={`mt-6 pt-6 border-t grid grid-cols-3 gap-3 text-center ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <FileText size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Smart Match
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <Briefcase size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              AI Powered
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
              <Target size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Job Ready
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Signup;
