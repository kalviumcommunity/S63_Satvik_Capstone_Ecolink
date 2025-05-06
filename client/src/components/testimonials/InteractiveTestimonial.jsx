import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Interactive Testimonial Carousel Component
 * 
 * Features:
 * - Animated transitions between testimonials
 * - Interactive navigation with dots and arrows
 * - Auto-advancing functionality
 * - Hover effects for user avatar and quotes
 * - Visual feedback for active testimonial
 */
const InteractiveTestimonial = ({ 
  testimonials, 
  autoAdvanceInterval = 5000,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Navigate to next testimonial
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);
  
  // Navigate to previous testimonial
  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);
  
  // Navigate to specific testimonial
  const goToTestimonial = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);
  
  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused || (pauseOnHover && isHovered)) return;
    
    const timer = setTimeout(() => {
      nextTestimonial();
    }, autoAdvanceInterval);
    
    return () => clearTimeout(timer);
  }, [currentIndex, testimonials.length, nextTestimonial, isPaused, pauseOnHover, isHovered, autoAdvanceInterval]);
  
  // Floating particles animation
  const Particles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary-500 opacity-10"
          initial={{ 
            x: Math.random() * 100 - 50 + 50, 
            y: Math.random() * 100 - 50 + 50,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [0, -40],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
  
  // Quote marks animation
  const AnimatedQuoteMark = ({ isOpening = true, delay = 0 }) => (
    <motion.div 
      className={`absolute ${isOpening ? '-top-1 -left-1' : '-bottom-8 -right-1'} w-12 h-12 text-5xl text-primary-500 opacity-20 ${!isOpening && 'transform rotate-180'}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      "
    </motion.div>
  );
  
  return (
    <div 
      className="relative w-full max-w-3xl mx-auto py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 rounded-xl -z-10"></div>
      <Particles />
      
      {/* Main testimonial carousel */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center relative overflow-hidden"
        >
          {/* Quote marks */}
          <AnimatedQuoteMark isOpening={true} delay={0.2} />
          <AnimatedQuoteMark isOpening={false} delay={0.3} />
          
          {/* Avatar */}
          <div className="relative mb-6">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-md opacity-70"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.img 
              src={testimonials[currentIndex].avatar} 
              alt={testimonials[currentIndex].name}
              className="relative w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-lg object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
          </div>
          
          {/* Quote */}
          <motion.blockquote 
            className="text-lg text-gray-700 dark:text-gray-300 italic mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              "{testimonials[currentIndex].quote}"
            </motion.span>
          </motion.blockquote>
          
          {/* Author info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-md blur-sm opacity-0"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
          </motion.div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  backgroundColor: index === currentIndex ? "#059669" : "#D1D5DB"
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.5 + (index * 0.1)
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <motion.button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300"
        onClick={prevTestimonial}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: -10 }}
        transition={{ delay: 0.6 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300"
        onClick={nextTestimonial}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ delay: 0.6 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Pause/Play button */}
      <motion.button
        className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300"
        onClick={() => setIsPaused(!isPaused)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        {isPaused ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

InteractiveTestimonial.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })
  ).isRequired,
  autoAdvanceInterval: PropTypes.number,
  pauseOnHover: PropTypes.bool
};

export default InteractiveTestimonial;