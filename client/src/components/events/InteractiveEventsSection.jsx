import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import InteractiveEventCard from './InteractiveEventCard';
import AnimatedStatsCounter from '../stats/AnimatedStatsCounter';
import InteractiveTestimonial from '../testimonials/InteractiveTestimonial';

/**
 * Interactive Events Section Component
 * 
 * A highly interactive and engaging events section that combines:
 * - Interactive event cards with flip animations
 * - Animated statistics counters
 * - Interactive testimonial carousel
 * - Background animations and effects
 */
const InteractiveEventsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Weekend Tree Planting",
      category: "Conservation",
      date: "June 12, 2025",
      location: "Riverside Park",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Join us for a weekend of tree planting to help restore our local ecosystem. No experience necessary, all tools and saplings provided. Great for families and groups!",
      duration: "3 hours",
      organizer: "Green Earth Initiative",
      participants: 24
    },
    {
      id: 2,
      title: "Beach Cleanup Drive",
      category: "Cleanup",
      date: "July 5, 2025",
      location: "Sunset Beach",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Help us clean up Sunset Beach and protect marine life from plastic pollution. Gloves, bags, and refreshments will be provided. Make a direct impact on our local environment!",
      duration: "4 hours",
      organizer: "Ocean Guardians",
      participants: 18
    },
    {
      id: 3,
      title: "Urban Garden Workshop",
      category: "Education",
      date: "August 15, 2025",
      location: "Community Center",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Learn how to start and maintain your own urban garden, even in small spaces. Topics include container gardening, composting, and growing organic vegetables.",
      duration: "2 hours",
      organizer: "Urban Farmers Collective",
      participants: 12
    }
  ];
  
  // Sample data for stats
  const stats = [
    { icon: "🌳", count: 1200, label: "Trees Planted", color: "primary" },
    { icon: "👥", count: 450, label: "Volunteers", color: "secondary" },
    { icon: "🌎", count: 50, label: "Events Held", color: "accent" }
  ];
  
  // Sample data for testimonials
  const testimonials = [
    {
      name: "Sophie Smith",
      role: "Regular Volunteer",
      quote: "I can't believe how much impact our community has made! The weekend tree planting events have transformed our neighborhood.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Marcus Johnson",
      role: "Community Leader",
      quote: "The platform makes it so easy to organize and participate in environmental events. I've met amazing people while making a difference.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Aisha Patel",
      role: "First-time Volunteer",
      quote: "As a newcomer, I felt welcomed immediately. The beach cleanup was well-organized and I could see the impact we made in just a few hours!",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg"
    }
  ];
  
  // Animate section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("events-section");
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [controls]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Floating Particles Background
  const ParticlesBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-primary-500 opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };
  
  // View All Events Button
  const ViewAllButton = () => (
    <motion.div
      className="flex justify-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <motion.button
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative px-6 py-3 bg-primary-600 text-white rounded-full group-hover:bg-primary-700 transition-colors duration-300 flex items-center gap-2">
          <span>View All Events</span>
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </div>
      </motion.button>
    </motion.div>
  );
  
  // Section Title Component
  const SectionTitle = ({ title, subtitle, icon, delay = 0 }) => (
    <motion.div 
      className="text-center mb-12 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.7, delay }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary-500/10 rounded-full filter blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {icon && (
        <motion.div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </motion.div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 relative inline-block">
        {title}
        <motion.div 
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ width: 0, left: "50%" }}
          animate={{ width: "100%", left: 0 }}
          transition={{ duration: 0.7, delay: delay + 0.3 }}
        />
      </h2>
      
      {subtitle && (
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: delay + 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
  
  return (
    <div id="events-section" className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <ParticlesBackground />
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Events Section */}
        <SectionTitle 
          title="Discover Upcoming Events with Our Community" 
          subtitle="Join us in making a positive impact on the environment through these exciting opportunities"
          icon="🌿"
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event, index) => (
            <motion.div key={event.id} variants={itemVariants}>
              <InteractiveEventCard event={event} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        <ViewAllButton />
        
        {/* Stats Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <SectionTitle 
            title="Together, We Make a Difference" 
            subtitle="See how our community has grown and the impact we've made together"
            icon="🌎"
            delay={0.2}
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AnimatedStatsCounter 
                  icon={stat.icon} 
                  count={stat.count} 
                  label={stat.label} 
                  color={stat.color}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Testimonials Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <InteractiveTestimonial testimonials={testimonials} />
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveEventsSection;