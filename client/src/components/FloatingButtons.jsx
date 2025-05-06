import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interactive Floating Buttons Component
 * 
 * Highly interactive floating action buttons with:
 * - Pulse animations
 * - Click effects
 * - Ripple animations
 * - Floating motion
 * - Glow effects
 * - Enhanced tooltips
 * - Particle effects
 */
const FloatingButtons = () => {
  const [isHovered, setIsHovered] = useState({
    pet: false,
    community: false
  });
  
  const [isClicked, setIsClicked] = useState({
    pet: false,
    community: false
  });
  
  // Ripple effect state
  const [ripples, setRipples] = useState([]);
  
  // Handle click with ripple effect
  const handleClick = (buttonName, e) => {
    // Get click position relative to button
    const buttonElement = e.currentTarget;
    const rect = buttonElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new ripple
    const newRipple = {
      id: Date.now(),
      x,
      y,
      button: buttonName
    };
    
    setRipples([...ripples, newRipple]);
    
    // Set clicked state for button press animation
    setIsClicked(prev => ({ ...prev, [buttonName]: true }));
    setTimeout(() => {
      setIsClicked(prev => ({ ...prev, [buttonName]: false }));
    }, 300);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 1000);
  };
  
  // Particle animation variants
  const particleVariants = {
    initial: { 
      opacity: 0,
      scale: 0
    },
    animate: { 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, -20 + Math.random() * 40, -40 + Math.random() * 80],
      y: [0, -20 + Math.random() * 40, -60 + Math.random() * 120],
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };
  
  // Generate particles
  const Particles = ({ isActive, color }) => {
    return (
      <AnimatePresence>
        {isActive && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${color}`}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    );
  };
  
  // Ripple effect component
  const Ripple = ({ x, y }) => (
    <motion.span
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%"
      }}
      initial={{ width: 0, height: 0, opacity: 0.5 }}
      animate={{ 
        width: 100, 
        height: 100, 
        opacity: 0 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
  
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Virtual Pet Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Link
          to="/virtual-pet"
          className="relative block"
          onMouseEnter={() => setIsHovered(prev => ({ ...prev, pet: true }))}
          onMouseLeave={() => setIsHovered(prev => ({ ...prev, pet: false }))}
          onClick={(e) => handleClick('pet', e)}
        >
          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 bg-green-500 rounded-full blur-md z-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: isHovered.pet ? 0.6 : 0.2,
              scale: isHovered.pet ? 1.3 : 1.2,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Pulse animation */}
          <motion.div 
            className="absolute inset-0 bg-green-600 rounded-full z-0"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Button */}
          <motion.div 
            className="relative flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg z-10 overflow-hidden"
            whileHover={{ 
              backgroundColor: "#059669", // Tailwind green-700
              scale: 1.1,
              rotate: 6
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              y: { 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            {/* Ripple effects */}
            {ripples.filter(r => r.button === 'pet').map(ripple => (
              <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
            ))}
            
            {/* Icon */}
            <motion.svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ 
                rotate: isHovered.pet ? [0, 15, 0, -15, 0] : 0
              }}
              transition={{ 
                duration: 1.5,
                repeat: isHovered.pet ? Infinity : 0,
                repeatType: "reverse"
              }}
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
            </motion.svg>
            
            {/* Particles */}
            <Particles isActive={isHovered.pet} color="bg-green-300" />
          </motion.div>
          
          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {isHovered.pet && (
              <motion.div 
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-yellow-400"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🐾
                </motion.span>
                <span>Virtual Pet</span>
                
                {/* Tooltip arrow */}
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-gray-800 transform rotate-45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      {/* Community Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Link
          to="/community"
          className="relative block"
          onMouseEnter={() => setIsHovered(prev => ({ ...prev, community: true }))}
          onMouseLeave={() => setIsHovered(prev => ({ ...prev, community: false }))}
          onClick={(e) => handleClick('community', e)}
        >
          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 bg-green-500 rounded-full blur-md z-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: isHovered.community ? 0.6 : 0.2,
              scale: isHovered.community ? 1.3 : 1.2,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Pulse animation */}
          <motion.div 
            className="absolute inset-0 bg-green-600 rounded-full z-0"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5 // Offset from first button for visual interest
            }}
          />
          
          {/* Button */}
          <motion.div 
            className="relative flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg z-10 overflow-hidden"
            whileHover={{ 
              backgroundColor: "#059669", // Tailwind green-700
              scale: 1.1
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              y: { 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5 // Offset from first button
              }
            }}
          >
            {/* Ripple effects */}
            {ripples.filter(r => r.button === 'community').map(ripple => (
              <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
            ))}
            
            {/* Icon */}
            <motion.svg 
              className="w-7 h-7 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ 
                scale: isHovered.community ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.8,
                repeat: isHovered.community ? Infinity : 0,
                repeatType: "reverse"
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </motion.svg>
            
            {/* Particles */}
            <Particles isActive={isHovered.community} color="bg-green-300" />
          </motion.div>
          
          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {isHovered.community && (
              <motion.div 
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  👥
                </motion.span>
                <span>Community</span>
                
                {/* Tooltip arrow */}
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-gray-800 transform rotate-45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
};

export default FloatingButtons;