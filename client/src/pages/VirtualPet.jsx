import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Food menu data
const foodItems = [
  { id: 1, name: 'Fresh Meat', emoji: '🥩', bonusXp: 50 },
  { id: 2, name: 'Fish', emoji: '🐟', bonusXp: 40 },
  { id: 3, name: 'Chicken', emoji: '🍗', bonusXp: 30 },
  { id: 4, name: 'Water', emoji: '💧', bonusXp: 10 }
];

// Species-specific food menus
const petFoodItems = {
  "Amur Leopard": [
    { id: 1, name: 'Wild Deer', emoji: '🦌', bonusXp: 50, description: 'Primary prey in the wild' },
    { id: 2, name: 'Wild Boar', emoji: '🐗', bonusXp: 45, description: 'Rich in protein' },
    { id: 3, name: 'Rabbit', emoji: '🐰', bonusXp: 35, description: 'Common prey' },
    { id: 4, name: 'Fresh Water', emoji: '💧', bonusXp: 10, description: 'Essential hydration' }
  ],
  "Eagle": [
    { id: 1, name: 'Small Mammals', emoji: '🐹', bonusXp: 50, description: 'Primary prey' },
    { id: 2, name: 'Fish', emoji: '🐟', bonusXp: 45, description: 'Favorite catch' },
    { id: 3, name: 'Small Birds', emoji: '🐦', bonusXp: 40, description: 'Common prey' },
    { id: 4, name: 'Fresh Water', emoji: '💧', bonusXp: 10, description: 'Essential hydration' }
  ],
  "Bengal Tiger": [
    { id: 1, name: 'Wild Buffalo', emoji: '🐃', bonusXp: 50, description: 'Large prey' },
    { id: 2, name: 'Wild Boar', emoji: '🐗', bonusXp: 45, description: 'Common prey' },
    { id: 3, name: 'Deer', emoji: '🦌', bonusXp: 40, description: 'Regular prey' },
    { id: 4, name: 'Fresh Water', emoji: '💧', bonusXp: 10, description: 'Essential hydration' }
  ],
  "Blue Whale": [
    { id: 1, name: 'Krill', emoji: '🦐', bonusXp: 50, description: 'Primary food source' },
    { id: 2, name: 'Small Fish', emoji: '🐟', bonusXp: 40, description: 'Supplementary food' },
    { id: 3, name: 'Plankton', emoji: '🦠', bonusXp: 35, description: 'Rich in nutrients' },
    { id: 4, name: 'Sea Water', emoji: '🌊', bonusXp: 10, description: 'Essential hydration' }
  ],
  "Arctic Polar Bear": [
    { id: 1, name: 'Seal', emoji: '🦭', bonusXp: 50, description: 'Primary prey' },
    { id: 2, name: 'Fish', emoji: '🐟', bonusXp: 40, description: 'Common food source' },
    { id: 3, name: 'Arctic Cod', emoji: '🐠', bonusXp: 35, description: 'Regular prey' },
    { id: 4, name: 'Fresh Water', emoji: '💧', bonusXp: 10, description: 'Essential hydration' }
  ]
};

// Plant care menu data
const plantCareItems = {
  "Ghost Orchid": [
    { id: 1, name: 'Water', emoji: '💧', bonusXp: 30, description: 'Essential for growth' },
    { id: 2, name: 'Sunlight', emoji: '☀️', bonusXp: 40, description: 'Filtered light needed' },
    { id: 3, name: 'Humidity', emoji: '💨', bonusXp: 35, description: 'High humidity required' },
    { id: 4, name: 'Nutrients', emoji: '🌱', bonusXp: 25, description: 'Orchid fertilizer' }
  ],
  "Rafflesia Flower": [
    { id: 1, name: 'Host Plant Care', emoji: '🌿', bonusXp: 50, description: 'Care for host vine' },
    { id: 2, name: 'Shade', emoji: '🌳', bonusXp: 40, description: 'Maintain forest shade' },
    { id: 3, name: 'Water', emoji: '💧', bonusXp: 30, description: 'Maintain soil moisture' },
    { id: 4, name: 'Nutrients', emoji: '🌱', bonusXp: 35, description: 'Natural fertilizer' }
  ]
};

// Species-specific video settings
const videoSettings = {
  "Amur Leopard": {
    height: "400px",
    objectFit: "cover",
    src: "/videos/Amur Leopards.mp4",
    startTime: 5 // Start at 5 seconds
  },
  "Eagle": {
    height: "400px",
    objectFit: "cover",
    background: "linear-gradient(to bottom, #87CEEB, #E0F7FA)",
    src: "/videos/eagle.mp4",
    playbackRate: 0.8,
    startTime: 5 // Start at 5 seconds
  },
  "Bengal Tiger": {
    height: "400px",
    objectFit: "cover",
    objectPosition: "50% 40%",
    src: "/videos/Bengal Tiger.mp4",
    startTime: 5 // Start at 5 seconds
  },
  "Blue Whale": {
    height: "350px",
    objectFit: "contain",
    background: "linear-gradient(to bottom, #1E88E5, #B3E5FC)",
    src: "/videos/Blue Whale.mp4",
    playbackRate: 0.9,
    startTime: 1 // Start at 1 second
  },
  "Arctic Polar Bear": {
    height: "400px",
    objectFit: "cover",
    background: "linear-gradient(to bottom, #E3F2FD, #FFFFFF)",
    src: "/videos/Arctic Polar Bear.mp4",
    startTime: 5 // Start at 5 seconds
  }
};

// Plant-specific video settings
const plantVideoSettings = {
  "Ghost Orchid": {
    height: "400px",
    objectFit: "cover",
    src: "/videos/ghost-orchid.mp4",
    startTime: 5
  },
  "Rafflesia Flower": {
    height: "400px",
    objectFit: "cover",
    src: "/videos/rafflesia.mp4",
    startTime: 5
  }
};

// Pet animations
const petAnimations = {
  idle: {
    y: [0, -5, 0],
    x: [-2, 2, -2],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  },
  eating: {
    scale: [1, 1.05, 1, 1.05, 1],
    rotate: [-1, 1, -1, 1, 0],
    y: [0, 2, 0, 2, 0],
    transition: {
      duration: 1.5,
      repeat: 2,
      ease: "easeInOut"
    }
  },
  happy: {
    rotate: [-2, 2, -2, 2, 0],
    scale: [1, 1.1, 1, 1.1, 1],
    y: [0, -10, 0, -10, 0],
    transition: {
      duration: 1,
      repeat: 2,
      ease: "easeInOut"
    }
  },
  sleeping: {
    scale: [1, 1.05, 1],
    y: [0, -3, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  playing: {
    scale: [1, 1.15, 1, 1.15, 1],
    rotate: [-5, 5, -5, 5, 0],
    y: [0, -15, 0, -15, 0],
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 2,
      repeat: 2,
      ease: "easeInOut"
    }
  },
  jumping: {
    y: [0, -30, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.8,
      repeat: 3,
      ease: "easeOut"
    }
  },
  excited: {
    rotate: [-5, 5, -5, 5, 0],
    scale: [1, 1.2, 1, 1.2, 1],
    y: [0, -20, 0, -20, 0],
    x: [-15, 15, -15, 15, 0],
    transition: {
      duration: 1.5,
      repeat: 2,
      ease: "easeInOut"
    }
  },
  dizzy: {
    rotate: [0, 360],
    scale: [1, 0.9, 1],
    transition: {
      duration: 1,
      repeat: 1,
      ease: "easeInOut"
    }
  }
};

// Plant animations
const plantAnimations = {
  idle: {
    y: [0, -2, 0],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  },
  watered: {
    scale: [1, 1.05, 1],
    y: [0, -3, 0],
    transition: {
      duration: 2,
      repeat: 1,
      ease: "easeInOut"
    }
  },
  sunlight: {
    scale: [1, 1.08, 1],
    rotate: [-1, 1, -1, 1, 0],
    transition: {
      duration: 3,
      repeat: 1,
      ease: "easeInOut"
    }
  },
  growing: {
    scale: [1, 1.1, 1],
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: 1,
      ease: "easeInOut"
    }
  }
};

// Animation effects
const AnimationEffects = ({ effect }) => {
  const effects = {
    hearts: {
      emoji: '❤️',
      className: 'animate-float-up'
    },
    stars: {
      emoji: '⭐',
      className: 'animate-spin-float'
    },
    music: {
      emoji: '🎵',
      className: 'animate-bounce-away'
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute ${effects[effect].className}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          {effects[effect].emoji}
        </div>
      ))}
    </div>
  );
};

// Enhanced Food Menu Component
const FoodMenu = ({ isOpen, onClose, onSelectFood, petName }) => {
  const isPlant = petName === "Rafflesia Flower" || petName === "Ghost Orchid";
  const menuItems = isPlant ? plantCareItems[petName] : (petFoodItems[petName] || petFoodItems["Amur Leopard"]);
  const menuTitle = isPlant ? "Plant Care" : "Food";
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-start justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 m-4 w-full max-w-md mt-24 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative background elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-2xl opacity-60"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-secondary-100 dark:bg-secondary-900/20 blur-2xl opacity-60"></div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    {petName}'s {menuTitle}
                  </motion.h3>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Select {isPlant ? 'care option' : 'food'} for your {isPlant ? 'plant' : 'pet'}
                  </motion.p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="space-y-3 relative">
                {menuItems?.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => {
                      onSelectFood(item);
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 relative"
                  >
                    <div className="relative">
                      <div className="text-3xl relative z-10">{item.emoji}</div>
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-md z-0"
                        />
                      )}
                    </div>
                    <div className="flex-grow text-left">
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                      <span className="mr-1">+{item.bonusXp}</span>
                      <motion.div
                        animate={hoveredItem === item.id ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        XP
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Particle Effect Component
const ParticleEffect = ({ type, count = 15 }) => {
  const particles = Array.from({ length: count });
  
  const getEmoji = () => {
    switch (type) {
      case 'hearts': return '❤️';
      case 'stars': return '⭐';
      case 'music': return '🎵';
      case 'food': return ['🍖', '🥩', '🍗', '🐟'][Math.floor(Math.random() * 4)];
      case 'water': return '💧';
      case 'confetti': return ['🎉', '🎊', '✨', '🎈'][Math.floor(Math.random() * 4)];
      case 'leaves': return ['🍃', '🌿', '🍂', '🌱'][Math.floor(Math.random() * 4)];
      default: return '✨';
    }
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0.5, 
              opacity: 0 
            }}
            animate={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              scale: [0.5, 1, 0.8], 
              opacity: [0, 1, 0],
              rotate: [-10, 10, -10]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 2 * (0.7 + Math.random() * 0.6), 
              ease: "easeOut",
              delay: i * 0.05
            }}
          >
            {getEmoji()}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Weather Effect Component
const WeatherEffect = ({ type }) => {
  const count = 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute top-0 ${
            type === 'snow' 
              ? 'bg-white rounded-full w-2 h-2' 
              : 'bg-blue-300 w-1 h-10'
          }`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: -10,
            opacity: 0.7 + Math.random() * 0.3
          }}
          animate={{ 
            y: '120%',
            x: type === 'snow' ? [`${Math.random() * 100}%`, `${Math.random() * 100}%`] : `${Math.random() * 100}%`
          }}
          transition={{
            duration: type === 'snow' ? 5 + Math.random() * 5 : 1 + Math.random() * 1,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Achievement Notification Component
const AchievementNotification = ({ achievement, onClose }) => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-80 z-50 border-l-4 border-yellow-500"
    >
      <div className="flex items-start">
        <div className="mr-4">
          <motion.div 
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-2xl"
          >
            🏆
          </motion.div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">Achievement Unlocked!</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.title}</p>
          <div className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">+{achievement.xp} XP</div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

// Level Up Celebration Component
const LevelUpCelebration = ({ level, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Background celebration effects */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticleEffect type="confetti" count={30} />
        </div>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="mb-4">
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                rotate: [-10, 10, 0]
              }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-5xl"
            >
              🎉
            </motion.div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Level Up!</h2>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4"
          >
            Level {level}
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your bond with your pet has grown stronger! New abilities and features unlocked.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Habitat Elements Component
const HabitatElements = ({ petType, onInteract }) => {
  const elements = {
    forest: [
      { id: 'tree', emoji: '🌳', position: { top: '10%', left: '10%' } },
      { id: 'bush', emoji: '🌿', position: { bottom: '20%', right: '15%' } },
      { id: 'flower', emoji: '🌸', position: { bottom: '10%', left: '30%' } }
    ],
    ocean: [
      { id: 'coral', emoji: '🪸', position: { bottom: '10%', left: '20%' } },
      { id: 'fish', emoji: '🐠', position: { top: '30%', right: '20%' } },
      { id: 'seaweed', emoji: '🌿', position: { bottom: '5%', right: '40%' } }
    ],
    arctic: [
      { id: 'ice', emoji: '❄️', position: { top: '20%', left: '15%' } },
      { id: 'snow', emoji: '☃️', position: { bottom: '15%', right: '25%' } },
      { id: 'mountain', emoji: '🏔️', position: { top: '10%', right: '10%' } }
    ],
    jungle: [
      { id: 'vine', emoji: '🌿', position: { top: '5%', left: '25%' } },
      { id: 'flower', emoji: '🌺', position: { bottom: '10%', right: '20%' } },
      { id: 'fruit', emoji: '🍌', position: { top: '30%', right: '15%' } }
    ]
  };
  
  const habitatType = 
    petType === "Blue Whale" ? 'ocean' :
    petType === "Arctic Polar Bear" ? 'arctic' :
    petType === "Ghost Orchid" || petType === "Rafflesia Flower" ? 'jungle' :
    'forest';
  
  const habitatElements = elements[habitatType] || elements.forest;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {habitatElements.map(element => (
        <motion.div
          key={element.id}
          className="absolute text-3xl cursor-pointer pointer-events-auto"
          style={element.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: Math.random() * 0.5 }}
          whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onInteract(element)}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Time of Day Effect Component
const TimeOfDayEffect = ({ time = 'day' }) => {
  const overlayColors = {
    dawn: 'linear-gradient(180deg, rgba(255,166,158,0.2) 0%, rgba(255,227,183,0.1) 100%)',
    day: 'linear-gradient(180deg, rgba(135,206,235,0.1) 0%, rgba(255,255,255,0) 100%)',
    dusk: 'linear-gradient(180deg, rgba(255,111,97,0.2) 0%, rgba(255,204,92,0.1) 100%)',
    night: 'linear-gradient(180deg, rgba(25,25,112,0.3) 0%, rgba(0,0,0,0.2) 100%)'
  };
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000"
      style={{ background: overlayColors[time] || overlayColors.day }}
    />
  );
};

// --- Enhanced Virtual Pet Page Component ---
const VirtualPet = () => {
  // State management
  const [pet, setPet] = useState(() => {
    const savedPet = localStorage.getItem('currentPet');
    if (savedPet) {
      return JSON.parse(savedPet);
    }
    
    // Default to Ghost Orchid if no saved pet
    const isPlant = true;
    return {
      name: 'Ghost Orchid',
      image: '/images/species/ghost-orchid.jpg',
      description: 'The Ghost Orchid is a rare, endangered orchid species native to Florida, Cuba, and the Bahamas.',
      status: 'Endangered',
      population: 'Very rare',
      habitat: 'Swamp forests',
      threats: 'Habitat loss, poaching, climate change',
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
  });

  // Additional state for enhanced interactivity
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [animation, setAnimation] = useState('idle');
  const [effect, setEffect] = useState(null);
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isFeeding, setIsFeeding] = useState(false);
  const [showCareMenu, setShowCareMenu] = useState(false);
  const [showEducationalFeatures, setShowEducationalFeatures] = useState(false);
  const [showLearnPanel, setShowLearnPanel] = useState(false);
  const [showHabitatPanel, setShowHabitatPanel] = useState(false);
  const [showConservationPanel, setShowConservationPanel] = useState(false);
  const [weather, setWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [showAchievement, setShowAchievement] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(1);
  const [habitatInteractions, setHabitatInteractions] = useState(0);
  
  // Animation controls
  const petControls = useAnimation();
  const progressControls = useAnimation();
  const containerControls = useAnimation();
  
  // Calculate growth percentage based on XP within current level
  const calculateGrowth = () => {
    const xpInCurrentLevel = pet.bondXp % 1000; // Each level needs 1000 XP
    return Math.floor((xpInCurrentLevel / 1000) * 100); // Convert to percentage
  };

  // Enhanced feeding interaction
  const handleFeed = (food) => {
    setIsFeeding(true);
    setSelectedFood(food);
    setAnimation('eating');
    setEffect('food');
    
    // Play animation sequence
    petControls.start('eating');
    
    // Update pet state
    setPet(prevPet => {
      const newPet = {
        ...prevPet,
        hunger: Math.min(100, prevPet.hunger + food.bonusXp),
        happiness: Math.min(100, prevPet.happiness + 10),
        lastFed: Date.now(),
        bondXp: prevPet.bondXp + food.bonusXp/2
      };
      
      // Check for level up
      const newLevel = Math.floor(newPet.bondXp / 1000) + 1;
      if (newLevel > prevPet.bondLevel) {
        setPreviousLevel(prevPet.bondLevel);
        setTimeout(() => setShowLevelUp(true), 1000);
        newPet.bondLevel = newLevel;
        
        // Trigger celebration animation
        setTimeout(() => {
          setEffect('confetti');
          petControls.start('excited');
        }, 500);
      }
      
      return newPet;
    });

    // Reset feeding state after animation
    setTimeout(() => {
      setIsFeeding(false);
      setSelectedFood(null);
      setAnimation('idle');
      setEffect(null);
      petControls.start('idle');
    }, 3000);
    
    // Check for achievements
    checkForAchievements('feeding');
  };

  // Enhanced play interaction
  const handlePlay = () => {
    setAnimation('playing');
    setEffect('music');
    petControls.start('playing');
    
    setPet(prevPet => {
      const newPet = {
        ...prevPet,
        happiness: Math.min(100, prevPet.happiness + 30),
        hunger: Math.max(0, prevPet.hunger - 10),
        lastPlayed: Date.now(),
        bondXp: prevPet.bondXp + 10
      };
      
      // Check for level up
      const newLevel = Math.floor(newPet.bondXp / 1000) + 1;
      if (newLevel > prevPet.bondLevel) {
        setPreviousLevel(prevPet.bondLevel);
        setTimeout(() => setShowLevelUp(true), 1000);
        newPet.bondLevel = newLevel;
      }
      
      return newPet;
    });
    
    // Reset animation after delay
    setTimeout(() => {
      setAnimation('idle');
      setEffect(null);
      petControls.start('idle');
    }, 3000);
    
    // Check for achievements
    checkForAchievements('playing');
  };

  // Enhanced educational feature interaction
  const handleEducationalFeature = () => {
    setShowEducationalFeatures(true);
    setPet(prevPet => ({
      ...prevPet,
      bondXp: prevPet.bondXp + 15
    }));
    
    // Check for achievements
    checkForAchievements('learning');
  };

  // Handle habitat element interaction
  const handleHabitatInteraction = (element) => {
    setHabitatInteractions(prev => prev + 1);
    
    // Different effects based on element type
    switch(element.id) {
      case 'tree':
      case 'bush':
      case 'vine':
        setEffect('leaves');
        petControls.start('happy');
        break;
      case 'flower':
        setEffect('hearts');
        petControls.start('happy');
        break;
      case 'fish':
      case 'fruit':
        setEffect('food');
        petControls.start('eating');
        break;
      case 'ice':
      case 'snow':
        setWeather('snow');
        setTimeout(() => setWeather(null), 5000);
        break;
      default:
        setEffect('stars');
        petControls.start('excited');
    }
    
    // Add XP for interaction
    setPet(prevPet => ({
      ...prevPet,
      bondXp: prevPet.bondXp + 5,
      happiness: Math.min(100, prevPet.happiness + 5)
    }));
    
    // Reset effects after delay
    setTimeout(() => {
      setEffect(null);
      petControls.start('idle');
    }, 2000);
    
    // Check for achievements
    if (habitatInteractions + 1 >= 10) {
      showAchievementNotification({
        title: 'Habitat Explorer',
        description: 'Interacted with habitat elements 10 times',
        xp: 50
      });
    }
  };

  // Achievement system
  const checkForAchievements = (action) => {
    // Example achievement checks
    if (action === 'feeding' && pet.bondLevel >= 3) {
      showAchievementNotification({
        title: 'Nurturing Caretaker',
        description: 'Reached level 3 by feeding your pet regularly',
        xp: 100
      });
    }
    
    if (action === 'playing' && pet.happiness >= 90) {
      showAchievementNotification({
        title: 'Happiness Expert',
        description: 'Kept your pet\'s happiness above 90%',
        xp: 75
      });
    }
    
    if (action === 'learning' && !localStorage.getItem('learningAchievement')) {
      localStorage.setItem('learningAchievement', 'true');
      showAchievementNotification({
        title: 'Curious Naturalist',
        description: 'Learned about your pet\'s natural habitat',
        xp: 50
      });
    }
  };

  // Show achievement notification
  const showAchievementNotification = (achievement) => {
    setShowAchievement(achievement);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setShowAchievement(null);
    }, 5000);
    
    // Add achievement XP
    setPet(prevPet => ({
      ...prevPet,
      bondXp: prevPet.bondXp + achievement.xp
    }));
  };

  // Enhanced care interaction
  const handleCare = (careOption) => {
    if (!pet) return;

    const now = Date.now();
    const isPlant = 'waterLevel' in pet;

    if (isPlant) {
      // Plant-specific care handling
      switch (careOption.name.toLowerCase()) {
        case 'water':
          if (now - pet.lastWatered < 3600000) { // 1 hour cooldown
            alert('Your plant was recently watered. Please wait before watering again.');
            return;
          }
          setPet(prev => ({
            ...prev,
            waterLevel: Math.min(100, prev.waterLevel + 30),
            bondXp: prev.bondXp + careOption.bonusXp,
            lastWatered: now
          }));
          setAnimation('watered');
          setEffect('water');
          break;

        case 'sunlight':
          if (now - pet.lastSunExposure < 7200000) { // 2 hour cooldown
            alert('Your plant has had enough sunlight recently. Please wait before exposing to more light.');
            return;
          }
          setPet(prev => ({
            ...prev,
            sunlight: Math.min(100, prev.sunlight + 30),
            bondXp: prev.bondXp + careOption.bonusXp,
            lastSunExposure: now
          }));
          setAnimation('sunlight');
          setEffect('stars');
          setTimeOfDay('day');
          break;

        default:
          setPet(prev => ({
            ...prev,
            bondXp: prev.bondXp + careOption.bonusXp
          }));
          setAnimation('growing');
          setEffect('stars');
      }
    } else {
      // Existing animal care handling
      if (now - pet.lastFed < 3600000) { // 1 hour cooldown
        alert('Your pet was recently fed. Please wait before feeding again.');
        return;
      }
      setPet(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 30),
        bondXp: prev.bondXp + careOption.bonusXp,
        lastFed: now
      }));
      setAnimation('eating');
      setEffect('hearts');
    }

    // Update localStorage
    localStorage.setItem('currentPet', JSON.stringify(pet));

    // Reset animation after delay
    setTimeout(() => {
      setAnimation('idle');
      setEffect(null);
    }, 3000);
    
    // Check for achievements
    checkForAchievements('caring');
  };

  // Update bond level based on XP
  useEffect(() => {
    const newBondLevel = Math.floor(pet.bondXp / 1000) + 1;
    if (newBondLevel !== pet.bondLevel) {
      setPet(prevPet => ({
        ...prevPet,
        bondLevel: newBondLevel
      }));
    }
  }, [pet.bondXp]);

  // Decrease stats over time
  useEffect(() => {
    const timer = setInterval(() => {
      setPet(prevPet => ({
        ...prevPet,
        hunger: Math.max(0, prevPet.hunger - 1),
        happiness: Math.max(0, prevPet.happiness - 1)
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Save pet data whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPet', JSON.stringify(pet));
  }, [pet]);

  // Video setup effect
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const settings = videoSettings[pet.name];
      
      if (settings?.playbackRate) {
        video.playbackRate = settings.playbackRate;
      }

      // Set the start time when video is loaded
      const handleLoadedData = () => {
        if (settings?.startTime) {
          video.currentTime = settings.startTime;
        }
      };
      
      // Reset error state when pet changes
      setVideoError(false);
      
      // Handle video errors
      const handleError = () => {
        console.error(`Error loading video for ${pet.name}`);
        setVideoError(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [pet.name]);

  // Video looping effect
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const settings = videoSettings[pet.name];
      
      const handleTimeUpdate = () => {
        // For all videos except Blue Whale, loop back to start time at 49 seconds
        if (pet.name !== "Blue Whale" && video.currentTime >= 49) {
          video.currentTime = settings?.startTime || 5;
        }
        // For Blue Whale, loop back to start time at 11 seconds
        else if (pet.name === "Blue Whale" && video.currentTime >= 11) {
          video.currentTime = settings?.startTime || 1;
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [pet.name]);

  // Time of day cycle effect
  useEffect(() => {
    // Cycle through times of day
    const timeInterval = setInterval(() => {
      setTimeOfDay(current => {
        const times = ['dawn', 'day', 'dusk', 'night'];
        const currentIndex = times.indexOf(current);
        return times[(currentIndex + 1) % times.length];
      });
    }, 60000); // Change every minute for demo purposes
    
    return () => clearInterval(timeInterval);
  }, []);

  // Random weather effect
  useEffect(() => {
    const weatherInterval = setInterval(() => {
      // 10% chance of weather change
      if (Math.random() < 0.1) {
        const weathers = [null, 'rain', 'snow'];
        const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
        setWeather(newWeather);
        
        // Clear weather after some time
        if (newWeather) {
          setTimeout(() => setWeather(null), 10000);
        }
      }
    }, 30000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Progress bar animation effect
  useEffect(() => {
    progressControls.start({
      width: `${(pet.bondXp % 1000) / 10}%`,
      transition: { duration: 1, ease: "easeOut" }
    });
  }, [pet.bondXp, progressControls]);

  // Container entrance animation
  useEffect(() => {
    containerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [containerControls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={containerControls}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-60"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-secondary-100 dark:bg-secondary-900/20 blur-3xl opacity-60"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white font-display mb-2 relative inline-block"
            whileHover={{ scale: 1.02 }}
          >
            My Virtual Pet
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-primary-500 dark:bg-primary-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h1>
          
          <div className="flex items-center">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Level {pet.bondLevel}
            </motion.p>
            
            <div className="mx-4 h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="relative flex-1 max-w-xs">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-gray-500 dark:text-gray-400 mb-1"
              >
                Growth Progress
              </motion.div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-400 dark:from-primary-400 dark:to-primary-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={progressControls}
                />
                
                {/* Particle effects on the progress bar */}
                <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${calculateGrowth()}%` }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 h-full w-1 bg-white opacity-60"
                      animate={{
                        left: ['100%', '0%'],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Educational Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLearnPanel(true)}
            className="relative bg-gradient-to-br from-green-500 to-green-600 text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center">
              <motion.span 
                className="mr-2 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.span>
              Learn
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHabitatPanel(true)}
            className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center">
              <motion.span 
                className="mr-2 text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌲
              </motion.span>
              Habitat
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConservationPanel(true)}
            className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center">
              <motion.span 
                className="mr-2 text-2xl"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🦁
              </motion.span>
              Conservation
            </span>
          </motion.button>
        </motion.div>

        {/* Educational Modals */}
        <AnimatePresence>
          {showLearnPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowLearnPanel(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-60"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-60"></div>
                
                <div className="relative">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                  >
                    <span className="mr-3 text-3xl">🔍</span>
                    About {pet.name}s
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                  >
                    {pet.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Facts</h3>
                    <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <span>🌍</span>
                        </div>
                        <span>Population: {pet.population}</span>
                      </motion.li>
                      
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
                          <span>⚠️</span>
                        </div>
                        <span>Conservation Status: {pet.status}</span>
                      </motion.li>
                      
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                          <span>🏞️</span>
                        </div>
                        <span>Natural Habitat: {pet.habitat}</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLearnPanel(false)}
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showHabitatPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowHabitatPanel(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-60"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-60"></div>
                
                <div className="relative">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                  >
                    <span className="mr-3 text-3xl">🏞️</span>
                    Natural Habitat
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                  >
                    {pet.name}s are found in {pet.habitat}.
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-6 relative"
                  >
                    <img 
                      src={pet.image} 
                      alt={`${pet.name} habitat`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Natural habitat of {pet.name}
                    </div>
                  </motion.div>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHabitatPanel(false)}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showConservationPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowConservationPanel(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-yellow-100 dark:bg-yellow-900/20 blur-3xl opacity-60"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-red-100 dark:bg-red-900/20 blur-3xl opacity-60"></div>
                
                <div className="relative">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                  >
                    <span className="mr-3 text-3xl">🛡️</span>
                    Conservation Status
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                      pet.status === 'Critically Endangered' ? 'bg-red-500 dark:bg-red-600' :
                      pet.status === 'Endangered' ? 'bg-orange-500 dark:bg-orange-600' :
                      'bg-yellow-500 dark:bg-yellow-600'
                    }`}>
                      {pet.status}
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                  >
                    Current population: {pet.population}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Main Threats:</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{pet.threats}</p>
                  </motion.div>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConservationPanel(false)}
                    className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet Video Area */}
        <Card variant="elevated" className="mb-8 overflow-hidden">
          <div className="relative w-full aspect-[21/9] perspective-1000">
            {/* Time of day effect */}
            <TimeOfDayEffect time={timeOfDay} />
            
            {/* Weather effects */}
            {weather && <WeatherEffect type={weather} />}
            
            <motion.div
              animate={petControls}
              variants={pet.name.includes("Orchid") || pet.name.includes("Flower") ? plantAnimations : petAnimations}
              initial="idle"
              className="absolute inset-0 w-full h-full transform-gpu"
              style={{ 
                background: videoSettings[pet.name]?.background || "transparent",
                transformStyle: "preserve-3d"
              }}
            >
              <video
                ref={videoRef}
                key={pet.name}
                className="w-full h-full"
                style={{ 
                  objectFit: videoSettings[pet.name]?.objectFit || "cover",
                  objectPosition: videoSettings[pet.name]?.objectPosition || "center",
                  width: "100%",
                  height: "100%"
                }}
                src={videoSettings[pet.name]?.src}
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
              />
              
              {/* Interactive habitat elements */}
              <HabitatElements 
                petType={pet.name} 
                onInteract={handleHabitatInteraction}
              />
              
              {/* Particle effects */}
              {effect && <ParticleEffect type={effect} />}
              
              {/* Feeding Animation */}
              <AnimatePresence>
                {isFeeding && selectedFood && (
                  <motion.div
                    initial={{ opacity: 0, y: -50, x: "50%" }}
                    animate={{ opacity: 1, y: 100, x: "0%" }}
                    exit={{ opacity: 0, y: 200 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-6xl">{selectedFood.emoji}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats Display */}
            <div className="absolute top-4 left-4 space-y-2 z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg"
              >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Hunger</div>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 dark:from-green-400 dark:to-green-300 transition-all duration-300"
                    style={{ width: `${pet.hunger}%` }}
                    animate={{ width: `${pet.hunger}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg"
              >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Happiness</div>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-400 dark:to-yellow-300 transition-all duration-300"
                    style={{ width: `${pet.happiness}%` }}
                    animate={{ width: `${pet.happiness}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Interaction Buttons */}
            <div className="absolute top-4 right-4 space-y-3 z-10">
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFoodMenuOpen(true);
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg hover:from-green-600 hover:to-green-700 
                         transition-colors flex items-center justify-center w-14 h-14 relative group"
              >
                <span className="text-3xl relative z-10">🍽️</span>
                <div className="absolute inset-0 rounded-full bg-green-400 blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-4 shadow-lg hover:from-blue-600 hover:to-blue-700 
                         transition-colors flex items-center justify-center w-14 h-14 relative group"
              >
                <span className="text-3xl relative z-10">🎮</span>
                <div className="absolute inset-0 rounded-full bg-blue-400 blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.button>
            </div>

            {/* Food Menu */}
            <FoodMenu 
              isOpen={isFoodMenuOpen}
              onClose={() => setIsFoodMenuOpen(false)}
              onSelectFood={handleFeed}
              petName={pet.name}
            />
          </div>
        </Card>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About the Species */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card hover>
                <Card.Body>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About the Species</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{pet.description}</p>
                  <Button variant="outline" as={Link} to="/species">
                    Learn More →
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Did you know? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card hover variant="outline" className="bg-primary-50 dark:bg-primary-900/20">
                <Card.Body>
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-3xl bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    >
                      💡
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Did you know?</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {pet.name === "Ghost Orchid" 
                          ? "Ghost Orchids can go years without being seen, then suddenly bloom in large numbers."
                          : "Amur leopards can leap more than 10 feet high to catch prey."}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* My Bond */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card hover variant="elevated">
                <Card.Body>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    My Bond with {pet.name}
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Level</p>
                        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{pet.bondLevel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Experience</p>
                        <p className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                          {pet.bondXp % 1000} / 1000 XP
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-primary-500 to-primary-400 dark:from-primary-400 dark:to-primary-300 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(pet.bondXp % 1000) / 10}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Conservation Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card hover variant="elevated" className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800">
                <Card.Body>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Conservation Impact</h4>
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <span className="text-4xl">🌿</span>
                    </motion.div>
                    <div>
                      <p className="text-lg text-gray-600 dark:text-gray-300">You've unlocked</p>
                      <motion.p 
                        className="text-3xl font-bold text-primary-600 dark:text-primary-400"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        2 eco-credits
                      </motion.p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Achievement Notification */}
        <AnimatePresence>
          {showAchievement && (
            <AchievementNotification 
              achievement={showAchievement} 
              onClose={() => setShowAchievement(null)} 
            />
          )}
        </AnimatePresence>

        {/* Level Up Celebration */}
        <AnimatePresence>
          {showLevelUp && (
            <LevelUpCelebration 
              level={pet.bondLevel} 
              onClose={() => setShowLevelUp(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VirtualPet;