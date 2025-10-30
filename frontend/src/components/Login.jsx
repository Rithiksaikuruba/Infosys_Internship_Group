import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, FileText, Briefcase, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { isDark } = useTheme();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const userData = response.data || {};
      const firstName =
        userData.fullname?.split(' ')[0] ||
        email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);

      // Set user with id for correct Dashboard functionality
      setUser({
        id: userData.user_id || userData._id || '', // Ensuring ID field is set correctly
        name: userData.fullname || firstName,
        email: userData.email || email,
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}`,
      });

      setGreeting(`Hello, ${firstName}!`);
      setLoading(false);
      setTimeout(() => {
        setGreeting('');
        navigate('/');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 relative overflow-hidden 
        ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}
    >
      {greeting && (
        <div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br shadow-xl rounded-2xl px-8 py-5
          animate-fadein font-semibold text-xl text-white shadow-blue-300/40 ring-2 ring-indigo-400/40
          backdrop-blur-2xl select-none"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, #4f46e5cc 0%, #9333ea99 100%)'
              : 'linear-gradient(120deg, #60a5facc 0%, #818cf899 100%)',
          }}
        >
          {greeting}
        </div>
      )}
      {/* Animated icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-12 left-16 opacity-10 animate-float ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          <FileText size={65} />
        </div>
        <div className={`absolute bottom-36 right-20 opacity-10 animate-float-delayed ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
          <Briefcase size={56} />
        </div>
        <div className={`absolute top-1/3 right-1/4 opacity-10 animate-float-slow ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          <Target size={50} />
        </div>
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
        <div className={`absolute -bottom-44 -left-44 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-500' : 'bg-purple-200'}`}></div>
      </div>
      {/* Login Card */}
      <div
        className={`w-full max-w-md mx-3 rounded-3xl shadow-[0_12px_32px_0_rgba(60,72,143,0.13)] 
        border border-solid p-9 backdrop-blur-2xl z-10 relative transition-all duration-300 group
        ${isDark ? 'bg-black/45 border-gray-700/60 shadow-blue-900/25' : 'bg-white/75 border-gray-200 shadow-blue-600/10'}
        group-hover:scale-[1.02]`}
      >
        {/* Logo/Headline */}
        <div className="text-center mb-9">
          <div
            className={`mx-auto w-16 h-16 shadow-xl rounded-2xl flex items-center justify-center mb-3
          ${isDark ? 'bg-gradient-to-br from-blue-700 to-purple-700' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}
          >
            <FileText className="text-white" size={34} />
          </div>
          <h2
            className={`text-3xl font-extrabold tracking-tight mb-1 bg-gradient-to-r 
          ${isDark ? 'from-blue-300 to-purple-300' : 'from-blue-600 to-indigo-500'} bg-clip-text text-transparent`}
          >
            Welcome Back! <span role="img" aria-label="wave">
              👋
            </span>
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
            Match your skills with perfect opportunities
          </p>
          {error && (
            <div className="mt-3 px-3 py-2 bg-red-500/15 border border-red-500/40 rounded-lg animate-pulse">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </div>
        {/* Login form */}
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div className="group">
            <label className={`block mb-2 font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                  isDark ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
                }`}
              />
              <input
                type="email"
                className={`pl-12 pr-5 py-3 rounded-xl w-full border placeholder-gray-400 focus:outline-none focus:ring-[2.5px] bg-opacity-95 ${
                  isDark
                    ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-500/60 focus:border-blue-400'
                    : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500 focus:border-blue-600'
                } shadow-sm focus:shadow-lg transition-all`}
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <label className={`block mb-2 font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                  isDark ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
                }`}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className={`pl-12 pr-12 py-3 rounded-xl w-full border placeholder-gray-400 focus:outline-none focus:ring-[2.5px] bg-opacity-95 ${
                  isDark
                    ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-500/60 focus:border-blue-400'
                    : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500 focus:border-blue-600'
                } shadow-sm focus:shadow-lg transition-all`}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                tabIndex={-1}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 ${
                  isDark ? 'text-gray-400 hover:text-gray-100 focus:ring-blue-500/40' : 'text-gray-500 hover:text-gray-800 focus:ring-blue-500/30'
                }`}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {/* Options row */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className={`rounded accent-blue-500 border w-4 h-4 cursor-pointer transition-colors focus:outline-none ${
                  isDark ? 'bg-gray-800 border-gray-600 focus:ring-blue-500' : 'bg-white border-gray-300 focus:ring-blue-600'
                }`}
              />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                Remember me
              </span>
            </label>
            <Link to="/forgot-password" className={`text-sm font-semibold transition-colors ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}>
              Forgot password?
            </Link>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-base text-white backdrop-blur-md shadow-xl transition-all transform hover:scale-[1.03] active:scale-95 focus:ring-2 focus:ring-offset-1 ring-offset-transparent disabled:opacity-60 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500/40 shadow-blue-900/20'
                : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:to-indigo-600 focus:ring-blue-600/30 shadow-blue-400/10'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center py-1">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In to Your Account'
            )}
          </button>
        </form>
        {/* Divider */}
        <div className="my-7 relative">
          <div className={`absolute inset-0 flex items-center ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 rounded-xl shadow-sm ${isDark ? 'bg-black/50 text-gray-400' : 'bg-white/80 text-gray-500'}`}>
              New to Resume Matcher?
            </span>
          </div>
        </div>
        {/* Signup link */}
        <div className="text-center mb-2">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Create an account to start matching{' '}
            <Link to="/signup" className={`font-bold transition-colors inline-flex items-center gap-1 ${isDark ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}>
              Sign Up
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </p>
        </div>
        {/* Features */}
        <div className={`mt-6 pt-5 border-t grid grid-cols-3 gap-3 text-center ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 shadow ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
              <FileText size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Smart Match</span>
          </div>
          <div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 shadow ${isDark ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>
              <Briefcase size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>AI Powered</span>
          </div>
          <div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 shadow ${isDark ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
              <Target size={20} />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Job Ready</span>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>
        {`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-27px) rotate(8deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-7deg);
            }
          }
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-18px) rotate(4deg);
            }
          }
          .animate-float {
            animation: float 7s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
            animation-delay: 1.3s;
          }
          .animate-float-slow {
            animation: float-slow 9s cubic-bezier(0.4, 0.2, 0.2, 1) infinite;
            animation-delay: 2.1s;
          }
          @keyframes fadein {
            0% {
              opacity: 0;
              transform: translateY(-36px) scale(0.98);
            }
            80% {
              opacity: 1;
              transform: translateY(5px) scale(1.01);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadein {
            animation: fadein 0.7s cubic-bezier(0.26, 0.68, 0.58, 1.05);
          }
        `}
      </style>
    </div>
  );
};

export default Login;
