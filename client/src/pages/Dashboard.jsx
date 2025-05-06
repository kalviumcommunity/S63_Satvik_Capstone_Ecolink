import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Specific Dashboard Components ---
const WelcomeHeader = ({ name }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="mb-8"
  >
    <div className="relative">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-display mb-2">
        Welcome Back, <span className="text-gradient">{name}</span>
      </h1>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-500/10 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
    </div>
    <p className="text-xl text-gray-600 dark:text-gray-300">Here's your environmental impact overview</p>
  </motion.div>
);

const ImpactCard = ({ icon, label, value, unit, color = "primary" }) => {
  const colorClasses = {
    primary: "from-primary-500/20 to-primary-500/5 dark:from-primary-900/30 dark:to-primary-900/10",
    secondary: "from-secondary-500/20 to-secondary-500/5 dark:from-secondary-900/30 dark:to-secondary-900/10",
    accent: "from-amber-500/20 to-amber-500/5 dark:from-amber-900/30 dark:to-amber-900/10"
  };

  const iconColors = {
    primary: "text-primary-600 dark:text-primary-400",
    secondary: "text-secondary-600 dark:text-secondary-400",
    accent: "text-amber-600 dark:text-amber-400"
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} z-0`}></div>
      <div className="relative z-10">
        <div className={`text-5xl mb-4 ${iconColors[color]}`}>{icon}</div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white">
          {value} <span className="text-base font-normal text-gray-600 dark:text-gray-400">{unit}</span>
        </p>
      </div>
    </motion.div>
  );
};

const EventCard = ({ title, date, time, location, organizer, image }) => (
  <motion.div 
    variants={itemVariants}
    className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
  >
    <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">{title}</h4>
        <div className="space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date} • {time}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {organizer}
          </p>
        </div>
      </div>
      
      <Link 
        to="/events" 
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
        <button className="relative px-4 py-2 bg-primary-600 text-white rounded-full group-hover:bg-primary-700 transition-colors duration-300 flex items-center gap-2">
          <span>View All</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </Link>
    </div>
  </motion.div>
);

const EcoTipCard = ({ tip }) => (
  <motion.div 
    variants={itemVariants}
    className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-amber-900/20 dark:to-amber-900/5 z-0"></div>
    <div className="relative z-10 flex items-start gap-4">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-2xl">
        💡
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Eco Tip of the Day</h4>
        <p className="text-gray-700 dark:text-gray-300">{tip}</p>
      </div>
    </div>
  </motion.div>
);

const RankCard = ({ rank }) => (
  <motion.div 
    variants={itemVariants}
    className="relative overflow-hidden rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 text-center transition-all duration-300 hover:shadow-md"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-transparent dark:from-primary-900/30 dark:via-secondary-900/20 z-0"></div>
    <div className="relative z-10">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Community Rank</h3>
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-md mb-4">
        <p className="text-4xl font-bold text-gradient">#{rank}</p>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-primary-500 opacity-70"></div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Keep it up! You're making a difference.
      </p>
    </div>
  </motion.div>
);

const PetCard = () => {
  const [pet, setPet] = useState(() => {
    const savedPet = localStorage.getItem('currentPet');
    return savedPet ? JSON.parse(savedPet) : {
      name: 'Ghost Orchid',
      image: '/images/species/ghost-orchid.jpg',
      bondLevel: 3,
      bondXp: 65
    };
  });

  // Calculate growth percentage
  const calculateGrowth = () => {
    const xpInCurrentLevel = pet.bondXp % 100;
    return Math.floor((xpInCurrentLevel / 100) * 100);
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-secondary-500/5 dark:from-secondary-900/30 dark:to-secondary-900/10 z-0"></div>
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Virtual Pet</h3>
        
        <motion.div 
          className="relative inline-block mb-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-xl opacity-70"></div>
          <img 
            src={pet.image || "https://via.placeholder.com/150"} 
            alt={pet.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg relative z-10" 
          />
          <div className="absolute -bottom-2 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            Level {pet.bondLevel}
          </div>
        </motion.div>
        
        <div className="space-y-3">
          <p className="text-lg font-medium text-gray-800 dark:text-white">{pet.name}</p>
          
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${calculateGrowth()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Growth: {calculateGrowth()}%</p>
          </div>
          
          <Link 
            to="/virtual-pet"
            className="relative group block"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <button className="relative w-full py-2 px-4 bg-primary-600 text-white rounded-full group-hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center gap-2">
              <span>Visit Pet</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample data
  const userRank = 102;
  const treesPlanted = 12;
  const wasteCollected = 120; // Assuming Kg
  const ecoPoints = 220;
  const upcomingEvent = {
    title: "Beach Clean-up Drive",
    date: "April 10, 2025",
    time: "10:00 AM–1:00 PM",
    location: "Calangute Beach, Goa",
    organizer: "GreenGoa NCO",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" // Placeholder image
  };
  const ecoTip = "Reduce plastic use! Carry a reusable water bottle and shopping bag to minimize single-use plastics.";

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <WelcomeHeader name={currentUser?.name || 'Explorer'} />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Environment Impact */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                Environmental Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ImpactCard icon="🌳" label="Trees Planted" value={treesPlanted} unit="" color="primary" />
                <ImpactCard icon="🗑️" label="Waste Collected" value={wasteCollected} unit="Kg" color="secondary" />
                <ImpactCard icon="🏅" label="Eco-points Earned" value={ecoPoints} unit="pt" color="accent" />
              </div>
            </section>

            {/* Upcoming Events */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Upcoming Events
              </h3>
              <EventCard {...upcomingEvent} />
            </section>

            {/* Eco-Tips */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                Daily Eco-Tip
              </h3>
              <EcoTipCard tip={ecoTip} />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RankCard rank={userRank} />
            <PetCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;