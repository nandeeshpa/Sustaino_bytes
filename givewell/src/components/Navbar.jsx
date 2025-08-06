import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  HeartIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getBadgeEmoji = (badge) => {
    switch (badge) {
      case 'Gold': return '🥇';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <HeartIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                GiveWell
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <Link 
                  to="/donations" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Donations
                </Link>
                <Link 
                  to="/create-donation" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Donate
                </Link>
                <Link 
                  to="/leaderboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Leaderboard
                </Link>
                <Link 
                  to="/map" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Map
                </Link>
                <Link 
                  to="/history" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  History
                </Link>
                {userProfile?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-red-600 hover:text-red-700 transition-colors font-medium"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Join Us
                </Link>
              </>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* User menu */}
            {currentUser && (
              <div className="relative">
                <div className="flex items-center space-x-3">
                  {userProfile && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {userProfile.fullName}
                        {userProfile.badge !== 'None' && (
                          <span className="ml-1">{getBadgeEmoji(userProfile.badge)}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {userProfile.points} points
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Link to="/profile">
                      <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
              {currentUser ? (
                <>
                  {userProfile && (
                    <div className="px-3 py-2 border-b dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {userProfile.fullName}
                        {userProfile.badge !== 'None' && (
                          <span className="ml-1">{getBadgeEmoji(userProfile.badge)}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {userProfile.points} points
                      </div>
                    </div>
                  )}
                  <Link 
                    to="/donations" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Donations
                  </Link>
                  <Link 
                    to="/create-donation" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Donate
                  </Link>
                  <Link 
                    to="/leaderboard" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Leaderboard
                  </Link>
                  <Link 
                    to="/map" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Map
                  </Link>
                  <Link 
                    to="/history" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    History
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  {userProfile?.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;