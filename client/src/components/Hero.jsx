import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        // Ensure video covers the container properly
        const video = videoRef.current;
        const container = video.parentElement;
        
        if (container) {
          // Make sure video always covers the entire container area
          video.style.width = '100%';
          video.style.height = '100%';
        }
      }
    };

    // Set initial size
    handleResize();
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/satvik.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated particles/elements for visual interest */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-white max-w-2xl text-center md:text-left">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-500/20 backdrop-blur-sm text-primary-300 text-sm font-medium mb-4">
                Join the Eco Movement
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight"
            >
              Make a <span className="text-gradient">Positive Impact</span> on Our Planet
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 text-neutral-200 leading-relaxed"
            >
              Connect with local environmental initiatives and be part of the change our world needs.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                to="/events" 
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <button className="relative px-8 py-3 bg-primary-600 text-white rounded-full group-hover:bg-primary-700 transition-colors duration-300 flex items-center gap-2">
                  <span>Explore Events</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              
              <Link 
                to="/species" 
                className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
              >
                <span>Discover Species</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 8.172a4 4 0 015.656 5.656l-5.656 5.656a4 4 0 11-5.656-5.656l5.656-5.656z M13.414 12l-4.242 4.243" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex items-center justify-center md:justify-start gap-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br from-primary-${i*100} to-secondary-${i*100}`}></div>
                  </div>
                ))}
              </div>
              <span className="text-sm text-neutral-300">Join 2,000+ eco-enthusiasts</span>
            </motion.div>
          </div>
          
          {/* Animated Graphic/Mascot */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:block"
          >
            <motion.div 
              className="w-80 h-80 relative"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for mascot/logo/illustration */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
      
      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl opacity-70"></div>
    </div>
  );
};

export default Hero;