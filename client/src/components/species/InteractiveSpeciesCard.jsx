import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

/**
 * Interactive Species Card Component
 * 
 * A highly interactive card for displaying species information with:
 * - Flip animation to reveal more details
 * - Hover effects with scale and elevation
 * - Animated progress bars for conservation status
 * - Particle effects and decorative elements
 * - Interactive 3D-like elements
 */
const InteractiveSpeciesCard = ({ 
  _id,
  name, 
  status, 
  population, 
  habitat, 
  threats, 
  description, 
  image, 
  didYouKnow 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Show particles briefly when card first appears
  useEffect(() => {
    setShowParticles(true);
    const timer = setTimeout(() => {
      setShowParticles(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Get status color and percentage for progress bars
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Critically Endangered':
        return { 
          color: 'red-500', 
          textColor: 'red-700',
          bgColor: 'red-100',
          percentage: 15,
          emoji: '⚠️'
        };
      case 'Endangered':
        return { 
          color: 'orange-500', 
          textColor: 'orange-700',
          bgColor: 'orange-100',
          percentage: 35,
          emoji: '⚠️'
        };
      case 'Vulnerable':
        return { 
          color: 'yellow-500', 
          textColor: 'yellow-700',
          bgColor: 'yellow-100',
          percentage: 60,
          emoji: '⚠️'
        };
      default:
        return { 
          color: 'gray-500', 
          textColor: 'gray-700',
          bgColor: 'gray-100',
          percentage: 50,
          emoji: 'ℹ️'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  // Handle adding as virtual pet
  const handleAddAsPet = (e) => {
    e.stopPropagation(); // Prevent card flip
    
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate('/login', { 
        state: { 
          from: '/species',
          message: 'Please log in to add a virtual pet'
        } 
      });
      return;
    }

    // Check if it's a plant species
    const isPlant = name.includes('Flower') || name.includes('Orchid');

    // Store the new pet data in localStorage
    const newPetData = {
      name,
      image,
      description,
      status,
      population,
      habitat,
      threats,
      didYouKnow,
      bondLevel: 1,
      bondXp: 0,
      ...(isPlant ? {
        waterLevel: 100,
        sunlight: 100,
        lastWatered: Date.now(),
        lastSunExposure: Date.now()
      } : {
        hunger: 100,
        happiness: 100,
        lastFed: Date.now(),
        lastPlayed: Date.now()
      })
    };
    
    try {
      localStorage.setItem('currentPet', JSON.stringify(newPetData));
      // Navigate to the virtual pet page
      navigate('/virtual-pet');
    } catch (error) {
      console.error('Error saving pet data:', error);
    }
  };

  // Handle learn more button click
  const handleLearnMore = (e) => {
    e.stopPropagation(); // Prevent card flip
    try {
      navigate(`/species/${_id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      window.location.href = `/species/${_id}`;
    }
  };

  // Particle animation component
  const Particles = ({ isActive, color }) => {
    return (
      <AnimatePresence>
        {isActive && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full bg-${color} opacity-70`}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0.7,
                  scale: 0
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 200, 
                  y: (Math.random() - 0.5) * 200,
                  opacity: 0,
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut"
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  zIndex: 20
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    );
  };

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Progress bar animation
  const ProgressBar = ({ percentage, color, animate = true }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <motion.div 
        className={`h-full bg-${color}`}
        initial={{ width: 0 }}
        animate={{ width: animate ? `${percentage}%` : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  );

  return (
    <motion.div
      className="relative perspective-1000 w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isFlipped ? "hover" : {}}
      whileTap={!isFlipped ? "tap" : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Particles effect */}
      <Particles isActive={showParticles || isHovered} color={statusInfo.color} />
      
      <AnimatePresence initial={false}>
        {!isFlipped ? (
          /* Front of card */
          <motion.div
            key="front"
            className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 backface-hidden"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row h-[500px]">
              {/* Left side - Image with overlay */}
              <div className="md:w-2/5 relative h-[250px] md:h-full overflow-hidden">
                {/* Status badge */}
                <motion.div 
                  className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-${statusInfo.color} text-white text-sm font-semibold flex items-center gap-1 shadow-md`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{statusInfo.emoji}</span>
                  <span>{status}</span>
                </motion.div>
                
                {/* Image placeholder */}
                {(!imageLoaded || imageError) && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-4xl">{name.charAt(0)}</div>
                  </div>
                )}
                
                {/* Actual image */}
                <motion.img 
                  src={image} 
                  alt={name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  animate={{ opacity: isHovered ? 0.8 : 0.6 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Species name overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 text-white"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold font-display">{name}</h2>
                  <motion.div 
                    className="h-1 bg-white rounded w-16 mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '60px' : '40px' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Right side - Content */}
              <div className="md:w-3/5 p-6 overflow-y-auto">
                {/* Description */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{description}</p>
                </motion.div>

                {/* Conservation Status */}
                <motion.div 
                  className={`mb-6 p-4 rounded-lg bg-${statusInfo.bgColor}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-${statusInfo.textColor} font-semibold`}>Conservation Status</h3>
                    <span className={`text-${statusInfo.textColor} text-sm`}>{statusInfo.percentage}%</span>
                  </div>
                  <ProgressBar percentage={statusInfo.percentage} color={statusInfo.color} />
                </motion.div>

                {/* Facts Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Population */}
                  <motion.div 
                    className="bg-primary-50 p-3 rounded-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-semibold text-primary-800 text-sm">Population</span>
                    </div>
                    <p className="text-primary-700 text-xs">{population}</p>
                  </motion.div>

                  {/* Habitat */}
                  <motion.div 
                    className="bg-primary-50 p-3 rounded-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-primary-800 text-sm">Habitat</span>
                    </div>
                    <p className="text-primary-700 text-xs">{habitat}</p>
                  </motion.div>

                  {/* Threats */}
                  <motion.div 
                    className="bg-primary-50 p-3 rounded-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-semibold text-primary-800 text-sm">Threats</span>
                    </div>
                    <p className="text-primary-700 text-xs">{threats}</p>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-4 mt-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={handleAddAsPet}
                    className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg font-medium text-sm"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#047857" // darker green
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <motion.span 
                        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
                      >
                        🐾
                      </motion.span>
                      <span>Add as Pet</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleLearnMore}
                    className="flex-1 py-2 px-4 bg-secondary-600 text-white rounded-lg font-medium text-sm"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#0369a1" // darker blue
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                      <span>Learn More</span>
                    </div>
                  </motion.button>
                </motion.div>
                
                {/* Flip indicator */}
                <motion.div 
                  className="absolute bottom-3 right-3 text-gray-400"
                  animate={{ opacity: isHovered ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Back of card */
          <motion.div
            key="back"
            className="relative bg-gradient-to-br from-primary-50 to-white rounded-xl overflow-hidden shadow-lg border border-gray-100 backface-hidden h-[500px]"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <motion.div 
                className="mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-primary-800 font-display">{name}</h2>
                <div className="flex justify-center mt-2">
                  <motion.div 
                    className="h-1 bg-primary-500 rounded w-24"
                    initial={{ width: 0 }}
                    animate={{ width: '6rem' }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  />
                </div>
              </motion.div>
              
              {/* Did You Know section */}
              <motion.div 
                className="mb-6 bg-primary-100 p-4 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    💡
                  </motion.div>
                  <div>
                    <h3 className="text-primary-800 font-semibold mb-1">Did You Know?</h3>
                    <p className="text-primary-700 text-sm">{didYouKnow}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Full Description */}
              <motion.div 
                className="mb-6 flex-grow overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-gray-800 font-semibold mb-2">About this Species</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </motion.div>
              
              {/* Conservation Status */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-gray-800 font-semibold mb-2">Conservation Status</h3>
                <div className={`p-4 rounded-lg bg-${statusInfo.bgColor}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-${statusInfo.textColor} font-medium`}>{status}</span>
                    <span className={`text-${statusInfo.textColor} text-sm`}>{statusInfo.percentage}%</span>
                  </div>
                  <ProgressBar percentage={statusInfo.percentage} color={statusInfo.color} />
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={handleAddAsPet}
                  className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg font-medium text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "#047857" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <motion.span 
                      animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
                    >
                      🐾
                    </motion.span>
                    <span>Add as Pet</span>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

InteractiveSpeciesCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
  habitat: PropTypes.string.isRequired,
  threats: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  didYouKnow: PropTypes.string.isRequired
};

export default InteractiveSpeciesCard;