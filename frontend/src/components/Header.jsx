import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ProfileDropdown from './ProfileDropdown';

// --- UTILITY FUNCTIONS ---
const getStatusColor = online => (online ? "bg-green-400" : "bg-gray-400");

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

// --- SUB-COMPONENTS ---
const Logo = ({ isDark }) => (
  <motion.div
    className="flex items-center space-x-3 select-none cursor-default"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.div
      className={clsx(
        "w-12 h-12 bg-white/30 dark:bg-white/20 backdrop-blur-lg border rounded-xl flex items-center justify-center shadow-lg",
        isDark ? "border-blue-400/40" : "border-blue-600/40"
      )}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <motion.path
          strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m-5.165-4.303a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
    <div>
      <h1 className={clsx("text-2xl font-bold tracking-tighter", isDark ? 'text-white' : 'text-gray-900')}>SkillMatcher AI</h1>
      <p className={clsx("text-xs font-medium tracking-wide", isDark ? 'text-gray-400' : 'text-gray-500')}>Resume & Job Analysis</p>
    </div>
  </motion.div>
);

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.div
    onClick={toggleTheme}
    className="flex items-center space-x-2 cursor-pointer select-none p-2 rounded-full"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    role="switch" aria-checked={isDark} tabIndex={0}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
  >
    <span className={clsx("text-sm font-medium", isDark ? 'text-gray-300' : 'text-gray-600')}>
      {isDark ? 'Dark' : 'Light'}
    </span>
    <div className={clsx(
      'relative w-14 h-7 rounded-full transition-colors duration-300',
      isDark ? 'bg-blue-900/60' : 'bg-gray-200/80'
    )}>
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ x: isDark ? 28 : 0 }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ y: -15, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 15, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? (
              <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            ) : (
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  </motion.div>
);

// avatar, online indicator, and dropdown logic
const UserAvatar = ({ user, isDark, isOpen }) => {
  const initials = getInitials(user?.name);
  const avatarClasses = "w-10 h-10 rounded-full border-2 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-500/50";
  const openRing = isOpen ? 'ring-4 ring-blue-500' : 'ring-0';
  if (user?.avatar) {
    return (
      <img src={user.avatar} alt={`${user.name}'s avatar`} className={clsx(avatarClasses, openRing, 'border-blue-300/60 bg-white object-cover shadow-sm')} loading="lazy" />
    );
  }
  return (
    <motion.div
      className={clsx(avatarClasses, openRing, "flex items-center justify-center font-semibold text-sm select-none shadow-sm", isDark ? 'bg-blue-800 text-blue-100 border-blue-500/60' : 'bg-blue-600 text-white border-blue-400/60')}
      animate={{ scale: isOpen ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      title={user?.name || 'User'}
    >
      {initials}
    </motion.div>
  );
};

const UserProfile = ({ user, userOnline, isDark }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => { setMenuOpen(false); setUser(null); navigate("/"); };

  useEffect(() => {
    const handleClickOutside = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <motion.button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full group" aria-haspopup="true" aria-expanded={menuOpen} aria-label="Toggle user menu" whileTap={{ scale: 0.95 }}>
        <span className="relative">
          <UserAvatar user={user} isDark={isDark} isOpen={menuOpen} />
          <motion.span
            className={clsx("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2", isDark ? 'border-gray-900' : 'border-white', getStatusColor(userOnline))}
            aria-label={userOnline ? "Online" : "Offline"}
            animate={{ scale: userOnline ? [1, 1.3, 1] : 1 }}
            transition={userOnline ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
          />
        </span>
      </motion.button>
      <AnimatePresence>
        {menuOpen && (
          <ProfileDropdown
            menuOpen={menuOpen}
            user={user}
            onLogout={handleLogout}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <motion.button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-900" whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 15px rgba(59, 130, 246, 0.3)" }} whileTap={{ scale: 0.98, y: 0 }} aria-label="Sign in" type="button">
      Sign In
    </motion.button>
  );
};

const HamburgerIcon = ({ isOpen }) => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <motion.path initial={false} animate={{ d: isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h7" }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} transition={{ type: "spring", stiffness: 260, damping: 20 }} />
  </svg>
);

const MobileMenu = ({ isOpen, isDark, user, userOnline, onClose }) => {
  const menuVariants = {
    open: {
      height: "auto",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], when: "beforeChildren", staggerChildren: 0.05 }
    },
    closed: {
      height: 0,
      transition: { duration: 0.4, ease: [0.6, 0, 0.78, 0], when: "afterChildren" }
    }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          key="mobile-menu"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="absolute top-full left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg overflow-hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col space-y-1 p-4">
            {['Home', 'Features', 'About'].map(item => (
              <motion.li key={item} variants={itemVariants}>
                <Link to={`/${item.toLowerCase()}`} onClick={onClose} className={clsx("block rounded-md py-3 px-4 text-lg font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", isDark ? "text-gray-300 hover:bg-blue-900/50 hover:text-white" : "text-blue-800 hover:bg-blue-100")}>
                  {item}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={itemVariants} className="pt-4 mt-2 border-t border-gray-300/50 dark:border-gray-700/50 flex justify-center">
              {user ? (
                <UserProfile user={user} userOnline={userOnline} isDark={isDark} />
              ) : (
                <SignInButton />
              )}
            </motion.li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// --- MAIN HEADER COMPONENT ---
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const userOnline = user?.isOnline ?? true;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={clsx(
        isDark ? 'bg-gray-900/85 border-gray-700/60' : 'bg-white/85 border-gray-200/90',
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300'
      )}>
        <motion.div
          className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Logo isDark={isDark} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 text-base font-medium" aria-label="Primary">
            <Link to="/" className={clsx("px-3 py-2 rounded-md transition-colors hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", isDark ? 'text-gray-300 hover:text-white' : 'text-blue-800 hover:text-blue-900')}>Home</Link>
            <Link to="/features" className={clsx("px-3 py-2 rounded-md transition-colors font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-800')}>Features</Link>
            <Link to="/about" className={clsx("px-3 py-2 rounded-md transition-colors hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", isDark ? 'text-gray-300 hover:text-white' : 'text-blue-800 hover:text-blue-900')}>About</Link>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-4"></div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            {user ? <UserProfile user={user} userOnline={userOnline} isDark={isDark} /> : <SignInButton />}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
             <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(v => !v)} aria-label="Toggle mobile menu" aria-expanded={mobileMenuOpen} className="p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" type="button">
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu Container */}
        <MobileMenu isOpen={mobileMenuOpen} isDark={isDark} user={user} userOnline={userOnline} onClose={() => setMobileMenuOpen(false)} />
      </header>
      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;
