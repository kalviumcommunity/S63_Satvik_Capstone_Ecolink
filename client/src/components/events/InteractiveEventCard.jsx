import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Interactive Event Card Component
 * 
 * Features:
 * - Flip animation to reveal more details
 * - Hover effects with scale/elevation changes
 * - Animated registration counter
 * - Glowing buttons with hover effects
 * - Micro-interactions throughout
 */
const InteractiveEventCard = ({ event, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(event.participants || 0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Random increment for registration count animation on hover
  useEffect(() => {
    if (isHovered && !isFlipped && registrationCount < (event.participants + 5)) {
      const timer = setTimeout(() => {
        setRegistrationCount(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHovered, registrationCount, event.participants, isFlipped]);

  // Reset confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <motion.div
      className="relative w-full h-[350px] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 backface-hidden"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              y: -5
            }}
          >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden">
              <motion.img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Floating Category Badge */}
              <motion.div 
                className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "#047857" // Darker green on hover
                }}
              >
                {event.category}
              </motion.div>
            </div>
            
            {/* Card Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              
              {/* Interactive Registration Counter */}
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        {String.fromCharCode(65 + i)}
                      </motion.div>
                    ))}
                  </div>
                  <motion.span 
                    className="text-sm text-gray-600 dark:text-gray-400"
                    animate={{ 
                      scale: registrationCount > event.participants ? [1, 1.2, 1] : 1,
                      color: registrationCount > event.participants ? ["#4B5563", "#059669", "#4B5563"] : "#4B5563"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    +{registrationCount} joined
                  </motion.span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <button className="relative px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                    Join
                  </button>
                </motion.div>
              </div>
              
              {/* Flip Indicator */}
              <motion.div 
                className="absolute bottom-3 right-3 text-gray-400 dark:text-gray-500"
                animate={{ opacity: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-lg border border-gray-100 dark:border-gray-700 backface-hidden p-6 flex flex-col"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              y: -5
            }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{event.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{event.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Duration</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Organizer</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizer}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-500 dark:border-primary-700 rounded-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                Back
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfetti(true);
                }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                  Register Now
                </div>
              </motion.button>
            </div>
            
            {/* Interactive element - favorite button */}
            <motion.div 
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowConfetti(true);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </motion.div>
            
            {/* Confetti effect */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                      top: '50%',
                      left: '50%'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0 
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200, 
                      y: (Math.random() - 0.5) * 200, 
                      scale: Math.random() * 1.5 + 0.5,
                      opacity: [1, 0]
                    }}
                    transition={{ 
                      duration: 1 + Math.random(), 
                      ease: "easeOut" 
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

InteractiveEventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
    participants: PropTypes.number
  }).isRequired,
  index: PropTypes.number
};

export default InteractiveEventCard;