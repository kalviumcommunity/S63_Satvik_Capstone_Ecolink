import React from 'react';
import { Link } from 'react-router-dom';

// --- Reusable Card Component (similar to Dashboard) ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-green-50 rounded-lg p-4 shadow-sm ${className}`}>
    {children}
  </div>
);

// --- Virtual Pet Page Component ---
const VirtualPet = () => {
  // Sample Data
  const petName = "Amur Leopard";
  const petImage = "https://storage.googleapis.com/pai-images/ae74b3802d8d40b09789a851a8770ca8.jpeg"; // Placeholder illustration
  const speciesDescription = "The Amur leopard is one of the world's most threatened big cats, known for its stunning rosete-patterned coat and solitary nature. It is native to the temperate forests of Russian Far East.";
  const funFact = "Amur leopards can leap more than 10 feet high to catch prey.";
  const bondLevel = 4;
  const bondXp = 250;
  const xpToNextLevel = 1000; // Example total XP for next level
  const ecoCredits = 2;

  const xpPercentage = (bondXp / xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Virtual Pet</h1>

        {/* Pet Image Area - Added relative positioning back */}
        <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg">
          <img src={petImage} alt={petName} className="w-full h-auto md:h-96 object-cover" />
          {/* Re-added Overlay Button Container */}
          <div className="absolute top-4 right-4 space-y-2 md:top-auto md:bottom-4 md:right-4">
             {/* Food Button */}
             <button className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white">
                 <span className="text-2xl">🍽️</span> 
             </button>
             {/* Other buttons could be added here later if needed */}
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About the Species */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About the Species</h2>
              <p className="text-gray-600 text-sm mb-2">{speciesDescription}</p>
              <Link to="/species" className="text-sm font-medium text-green-600 hover:text-green-700">
                 Know More →
              </Link>
            </div>
            {/* Did you know? */}
            <Card className="flex items-start gap-3">
              <span className="text-2xl mt-1">💡</span>
              <div>
                 <h4 className="font-semibold text-gray-800">Did you know?</h4>
                 <p className="text-sm text-gray-600">{funFact}</p>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* My Bond */}
            <div>
              <h2 className="text-xl font-semibold mb-2">My Bond with the {petName}s</h2>
              <div className="flex justify-between items-end mb-1">
                 <span className="text-sm font-medium text-gray-600">Level {bondLevel}</span>
                 <span className="text-xs font-medium text-green-600">+{bondXp}XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
               </div>
            </div>
             {/* Conservation Impact */}
            <Card>
              <h4 className="font-semibold text-gray-800 mb-2">Conservation Impact</h4>
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                     <span className="text-2xl">🌿</span>
                 </div>
                 <div>
                     <p className="text-sm text-gray-600">You've unlocked</p>
                     <p className="font-bold text-green-700">{ecoCredits} eco-credits</p>
                 </div>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet; 