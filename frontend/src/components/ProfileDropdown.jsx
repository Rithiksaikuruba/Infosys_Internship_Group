import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import DropdownItem from './DropdownItem';

import { FiGrid, FiUser, FiLogOut } from 'react-icons/fi';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const ProfileDropdown = ({ menuOpen, user, onLogout, onClose }) => {
  const { isDark } = useTheme();
  const initials = getInitials(user?.name);

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div
      className={clsx(
        'absolute right-0 mt-2 w-64 origin-top-right rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 ease-out z-50',
        isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200',
        menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      {/* Dropdown Header */}
      <div className="flex items-center gap-4 p-5">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="profile"
            className="w-12 h-12 rounded-full border-4 border-blue-500 object-cover"
          />
        ) : (
          <div
            className={clsx(
              'w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg text-white',
              isDark ? 'bg-blue-800 border-blue-600 border-2' : 'bg-blue-600 border-blue-400 border-2'
            )}
          >
            {initials}
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <p
            className={clsx(
              'font-bold truncate',
              isDark ? 'text-white' : 'text-gray-900'
            )}
          >
            {user.name || 'User'}
          </p>
          <p className={clsx('text-sm truncate', isDark ? 'text-gray-400' : 'text-gray-600')}>
            {user.email || 'user@example.com'}
          </p>
        </div>
      </div>

      <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />

      {/* Menu Items */}
      <div className="p-2" role="none">
        <DropdownItem icon={<FiGrid size={18} />} to="/dashboard" onClick={onClose}>
          Dashboard
        </DropdownItem>
        <DropdownItem icon={<FiUser size={18} />} to="/profile" onClick={onClose}>
          My Profile
        </DropdownItem>
      </div>

      <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />

      {/* Logout Button */}
      <div className="p-2" role="none">
        <DropdownItem icon={<FiLogOut size={18} />} onClick={handleLogout} isDestructive>
          Log Out
        </DropdownItem>
      </div>
    </div>
  );
};

export default ProfileDropdown;
