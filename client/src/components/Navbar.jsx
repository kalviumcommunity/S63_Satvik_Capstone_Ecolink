import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/628/628324.png" 
              alt="EcoLink Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-green-600">EcoLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-600 hover:text-green-600 font-medium">Events</Link>
            <Link to="/species" className="text-gray-600 hover:text-green-600 font-medium">Species</Link>
            <Link to="/impact" className="text-gray-600 hover:text-green-600 font-medium">Impact</Link>
            <Link to="/join" className="text-gray-600 hover:text-green-600 font-medium">Join</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
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
            <div className="px-4 py-2 space-y-3">
              <Link 
                to="/events" 
                className="block text-gray-600 hover:text-green-600 py-2 font-medium"
              >
                Events
              </Link>
              <Link 
                to="/species" 
                className="block text-gray-600 hover:text-green-600 py-2 font-medium"
              >
                Species
              </Link>
              <Link 
                to="/impact" 
                className="block text-gray-600 hover:text-green-600 py-2 font-medium"
              >
                Impact
              </Link>
              <Link 
                to="/join" 
                className="block text-gray-600 hover:text-green-600 py-2 font-medium"
              >
                Join
              </Link>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block text-gray-600 hover:text-green-600 py-2 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-green-600 text-white rounded-full px-4 py-2 text-center mt-2 hover:bg-green-700 transition-colors font-medium"
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