import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

const DropdownItem = ({ icon, children, onClick, to, isDestructive = false }) => {
  const { isDark } = useTheme();

  const classes = clsx(
    "flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
    isDestructive
      ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50' 
      : isDark
        ? 'text-gray-200 hover:bg-gray-700' 
        : 'text-gray-700 hover:bg-gray-100' 
  );

  const content = (
    <>
      {icon && <span className="mr-3">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} role="menuitem">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      role="menuitem"
    >
      {content}
    </button>
  );
};

export default DropdownItem;