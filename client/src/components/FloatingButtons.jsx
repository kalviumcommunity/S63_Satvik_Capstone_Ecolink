import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingButtons = () => {
  const [isHovered, setIsHovered] = useState({
    pet: false,
    community: false
  });

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4">
      {/* Virtual Pet Button */}
      <Link
        to="/virtual-pet"
        className="relative group"
        onMouseEnter={() => setIsHovered(prev => ({ ...prev, pet: true }))}
        onMouseLeave={() => setIsHovered(prev => ({ ...prev, pet: false }))}
      >
        <div className="flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 hover:rotate-6">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.6 0 3-.5 4.2-1.3"
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"
            />
          </svg>
        </div>
        {/* Tooltip */}
        <div className={`absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded whitespace-nowrap transition-opacity duration-200 ${isHovered.pet ? 'opacity-100' : 'opacity-0'} flex items-center gap-2`}>
          <span className="text-yellow-400">🐾</span>
          Virtual Pet
        </div>
      </Link>

      {/* Community Button */}
      <Link
        to="/community"
        className="relative group"
        onMouseEnter={() => setIsHovered(prev => ({ ...prev, community: true }))}
        onMouseLeave={() => setIsHovered(prev => ({ ...prev, community: false }))}
      >
        <div className="flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        {/* Tooltip */}
        <div className={`absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded whitespace-nowrap transition-opacity duration-200 ${isHovered.community ? 'opacity-100' : 'opacity-0'}`}>
          Community
        </div>
      </Link>
    </div>
  );
};

export default FloatingButtons; 