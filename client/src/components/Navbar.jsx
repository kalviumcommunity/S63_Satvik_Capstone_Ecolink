import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="EcoLink Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-green-700">EcoLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1.5 text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition-colors duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="flex items-center space-x-1.5 text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition-colors duration-150"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
               </svg>
               <span>Leaderboard</span>
            </Link>
            <Link 
              to="/events" 
              className="flex items-center space-x-1.5 text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition-colors duration-150"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
               </svg>
               <span>Events</span>
            </Link>
            <Link 
              to="/species" 
              className="flex items-center space-x-1.5 text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition-colors duration-150"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 8.172a4 4 0 015.656 5.656l-5.656 5.656a4 4 0 11-5.656-5.656l5.656-5.656z M13.414 12l-4.242 4.243"></path>
               </svg>
               <span>Species</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium transition-colors duration-150"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-150 font-medium shadow-sm"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/leaderboard" 
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                <span>Leaderboard</span>
              </Link>
              <Link 
                to="/events" 
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Events</span>
              </Link>
              <Link 
                to="/species" 
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 8.172a4 4 0 015.656 5.656l-5.656 5.656a4 4 0 11-5.656-5.656l5.656-5.656z M13.414 12l-4.242 4.243"></path>
                 </svg>
                <span>Species</span>
              </Link>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full mt-2 text-center bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition-colors font-medium"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 