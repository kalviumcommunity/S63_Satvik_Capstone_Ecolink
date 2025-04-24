import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white max-w-2xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join the Movement, Make an Impact!
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Be a part of local environmental efforts that change the world.
            </p>
            <Link 
              to="/events" 
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Explore Events
            </Link>
          </div>
          
          {/* Optional Mascot Placeholder */}
          <div className="hidden md:block">
            <div className="w-64 h-64 bg-white/10 rounded-full backdrop-blur-sm">
              {/* Add mascot image here if available */}
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🌱
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 