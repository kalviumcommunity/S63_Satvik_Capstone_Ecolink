import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated Stats Counter Component
 * 
 * Features:
 * - Animated counting from 0 to target value
 * - Entrance animations with staggered delay
 * - Interactive hover effects
 * - Customizable icons and colors
 */
const AnimatedStatsCounter = ({ 
  icon, 
  count, 
  label, 
  color = "primary", 
  index = 0,
  countDuration = 2000,
  countDelay = 300
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const controls = useAnimation();
  const countRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Color variants
  const colorVariants = {
    primary: {
      bg: "bg-primary-100 dark:bg-primary-900/30",
      text: "text-primary-600 dark:text-primary-400",
      accent: "from-primary-500/20 to-primary-500/5"
    },
    secondary: {
      bg: "bg-secondary-100 dark:bg-secondary-900/30",
      text: "text-secondary-600 dark:text-secondary-400",
      accent: "from-secondary-500/20 to-secondary-500/5"
    },
    accent: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      accent: "from-amber-500/20 to-amber-500/5"
    }
  };
  
  // Animate count when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          controls.start({
            scale: [1, 1.1, 1],
            transition: { duration: 0.5, delay: index * 0.2 }
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [count, controls, index]);
  
  // Start counting animation
  const startCounting = () => {
    // Reset count first
    setDisplayCount(0);
    
    // Animate count up
    const interval = 20; // Update every 20ms
    const steps = countDuration / interval;
    const increment = count / steps;
    let currentCount = 0;
    let timer;
    
    // Add a small delay before starting
    setTimeout(() => {
      timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
          clearInterval(timer);
          setDisplayCount(count);
        } else {
          setDisplayCount(Math.floor(currentCount));
        }
      }, interval);
    }, countDelay + (index * 200));
    
    return () => clearInterval(timer);
  };
  
  return (
    <motion.div 
      className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorVariants[color].accent} dark:from-gray-800 dark:to-gray-700 z-0`}></div>
      
      {/* Animated particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${colorVariants[color].bg}`}
              initial={{ 
                x: Math.random() * 100 - 50 + 50, 
                y: Math.random() * 100 - 50 + 50,
                opacity: 0
              }}
              animate={{ 
                y: [0, -40],
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        <motion.div 
          className={`mx-auto w-16 h-16 rounded-full ${colorVariants[color].bg} flex items-center justify-center ${colorVariants[color].text} mb-4`}
          animate={controls}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          {typeof icon === 'string' ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            icon
          )}
        </motion.div>
        
        <motion.div 
          ref={countRef}
          className={`text-3xl font-bold ${colorVariants[color].text} mb-1 relative`}
          animate={{ scale: displayCount === count ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated number */}
          <span>{displayCount}</span>
          <span>+</span>
          
          {/* Animated plus sign that appears when counting is complete */}
          {displayCount === count && (
            <motion.span
              className="absolute -right-2 -top-1"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-sm">✨</span>
            </motion.span>
          )}
        </motion.div>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + (index * 0.2) }}
        >
          {label}
        </motion.p>
      </div>
      
      {/* Interactive highlight effect on hover */}
      <motion.div
        className={`absolute inset-0 ${colorVariants[color].accent} opacity-0 z-0`}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

AnimatedStatsCounter.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'accent']),
  index: PropTypes.number,
  countDuration: PropTypes.number,
  countDelay: PropTypes.number
};

export default AnimatedStatsCounter;