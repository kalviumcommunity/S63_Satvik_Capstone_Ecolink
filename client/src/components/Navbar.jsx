import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">EcoLink</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/leaderboard" isActive={isActive('/leaderboard')}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <span>Leaderboard</span>
            </NavLink>
            
            <NavLink to="/species" isActive={isActive('/species')}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 8.172a4 4 0 015.656 5.656l-5.656 5.656a4 4 0 11-5.656-5.656l5.656-5.656z M13.414 12l-4.242 4.243"></path>
              </svg>
              <span>Species</span>
            </NavLink>
            
            {/* Links visible only when authenticated */}
            {isAuthenticated() && (
              <>
                <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink to="/events" isActive={isActive('/events')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>Events</span>
                </NavLink>
                
                <NavLink to="/upload-evidence" isActive={isActive('/upload-evidence')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span>Upload</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated() ? (
              // User Menu (Authenticated)
              <div className="relative group">
                <button className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none">
                  <span className="font-medium text-sm">{currentUser?.name || 'User'}</span>
                  <div className="relative">
                    {currentUser?.avatar ? (
                      <img 
                        src={currentUser.avatar}
                        alt="User Avatar"
                        className="h-9 w-9 rounded-full border-2 border-primary-100 dark:border-primary-900 group-hover:border-primary-300 dark:group-hover:border-primary-700 transition-colors object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-lg">
                        {currentUser?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white dark:border-neutral-800"></span>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-700 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out z-10 transform scale-95 group-hover:scale-100">
                  <div className="px-4 py-3">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Signed in as</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{currentUser?.email || 'No email'}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white">
                      <svg className="mr-3 h-4 w-4 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white">
                      <svg className="mr-3 h-4 w-4 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <svg className="mr-3 h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Login/Signup Buttons (Not Authenticated)
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-150"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-5 py-2 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 rounded-full group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-150 font-medium">
                    Join Now
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <MobileNavLink to="/leaderboard" isActive={isActive('/leaderboard')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span>Leaderboard</span>
                </MobileNavLink>
                
                <MobileNavLink to="/species" isActive={isActive('/species')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 8.172a4 4 0 015.656 5.656l-5.656 5.656a4 4 0 11-5.656-5.656l5.656-5.656z M13.414 12l-4.242 4.243"></path>
                  </svg>
                  <span>Species</span>
                </MobileNavLink>
                
                {isAuthenticated() && (
                  <>
                    <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                      </svg>
                      <span>Dashboard</span>
                    </MobileNavLink>
                    
                    <MobileNavLink to="/events" isActive={isActive('/events')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Events</span>
                    </MobileNavLink>
                    
                    <MobileNavLink to="/upload-evidence" isActive={isActive('/upload-evidence')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <span>Upload Evidence</span>
                    </MobileNavLink>
                  </>
                )}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 pb-3 border-t border-neutral-200 dark:border-neutral-700">
                {isAuthenticated() ? (
                  <div className="px-5 space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {currentUser?.avatar ? (
                          <img 
                            src={currentUser.avatar}
                            alt="User Avatar"
                            className="h-10 w-10 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-lg">
                            {currentUser?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-neutral-800 dark:text-neutral-200">{currentUser?.name || 'User'}</div>
                        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{currentUser?.email || 'No email'}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white">
                        Profile
                      </Link>
                      <Link to="/dashboard/settings" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white">
                        Settings
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 space-y-2">
                    <Link 
                      to="/login" 
                      className="block w-full px-4 py-2 text-center font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block w-full px-4 py-2 text-center font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-lg shadow-sm"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, children, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-medium' 
        : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
    }`}
  >
    {children}
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, children, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
      isActive 
        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-medium' 
        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;