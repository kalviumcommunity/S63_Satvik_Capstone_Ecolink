import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// --- Virtual Pet Page Component ---
const VirtualPet = () => {
  // Sample Data
  const petName = "Amur Leopard";
  const petImage = "https://storage.googleapis.com/pai-images/ae74b3802d8d40b09789a851a8770ca8.jpeg";
  const speciesDescription = "The Amur leopard is one of the world's most threatened big cats, known for its stunning rosete-patterned coat and solitary nature. It is native to the temperate forests of Russian Far East.";
  const funFact = "Amur leopards can leap more than 10 feet high to catch prey.";
  const bondLevel = 4;
  const bondXp = 250;
  const xpToNextLevel = 1000;
  const ecoCredits = 2;
  const [isFeeding, setIsFeeding] = useState(false);

  const xpPercentage = (bondXp / xpToNextLevel) * 100;

  const handleFeed = () => {
    setIsFeeding(true);
    setTimeout(() => setIsFeeding(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">My Virtual Pet</h1>
          <p className="text-xl text-gray-600">Bond with your endangered species and help with conservation</p>
        </motion.div>

        {/* Pet Image Area */}
        <Card variant="elevated" className="mb-8 overflow-hidden">
          <div className="relative">
            <motion.img 
              src={petImage} 
              alt={petName} 
              className="w-full h-[400px] object-cover"
              initial={{ scale: 1 }}
              animate={{ 
                scale: isFeeding ? [1, 1.02, 1] : 1,
                transition: { duration: 0.5 }
              }}
            />
            
            {/* Interaction Buttons */}
            <div className="absolute top-4 right-4 space-y-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFeed}
                className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white 
                         transition-colors flex items-center justify-center"
              >
                <span className="text-3xl">🍽️</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white 
                         transition-colors flex items-center justify-center"
              >
                <span className="text-3xl">🎮</span>
              </motion.button>
            </div>

            {/* Feeding Animation */}
            <AnimatePresence>
              {isFeeding && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-6xl animate-bounce">🍖</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About the Species */}
            <Card hover>
              <Card.Body>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Species</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{speciesDescription}</p>
                <Button variant="outline" as={Link} to="/species">
                  Learn More →
                </Button>
              </Card.Body>
            </Card>

            {/* Did you know? */}
            <Card hover variant="outline" className="bg-primary-50">
              <Card.Body>
                <div className="flex items-start gap-4">
                  <div className="text-3xl bg-white rounded-full p-2 shadow-sm">💡</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Did you know?</h4>
                    <p className="text-gray-700">{funFact}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* My Bond */}
            <Card hover variant="elevated">
              <Card.Body>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  My Bond with {petName}s
                </h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Level</p>
                      <p className="text-3xl font-bold text-primary-600">{bondLevel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Experience</p>
                      <p className="text-xl font-semibold text-primary-600">
                        {bondXp} / {xpToNextLevel} XP
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div 
                      className="bg-primary-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Conservation Impact */}
            <Card hover variant="elevated" className="bg-gradient-to-br from-primary-50 to-white">
              <Card.Body>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Conservation Impact</h4>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-4xl">🌿</span>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">You've unlocked</p>
                    <p className="text-3xl font-bold text-primary-600">{ecoCredits} eco-credits</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet; 