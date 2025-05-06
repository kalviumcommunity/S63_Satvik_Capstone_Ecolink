import React from 'react';
import { motion } from 'framer-motion';

const UserStatsCard = ({ userData }) => {
  // Default values if no userData is provided
  const {
    name = 'Eco Enthusiast',
    level = 3,
    points = 245,
    nextLevelPoints = 300,
    eventsAttended = 5,
    speciesDiscovered = 12,
    treesPlanted = 8,
    wasteCollected = 45,
    carbonSaved = 120,
    rank = 42,
    totalUsers = 500,
  } = userData || {};

  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((points / nextLevelPoints) * 100), 100);
  
  // Calculate rank percentile (lower is better)
  const rankPercentile = Math.round((rank / totalUsers) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-100 dark:border-neutral-700 overflow-hidden"
    >
      {/* Header with user info and level */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{name}'s Impact</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Your environmental contribution</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-bold">{level}</span>
            </div>
            <div>
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">LEVEL</span>
              <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Eco Ranger</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Progress to Level {level + 1}</span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{points}/{nextLevelPoints} points</span>
          </div>
          <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-px bg-neutral-100 dark:bg-neutral-700">
        <StatItem 
          icon="🌳" 
          label="Trees Planted" 
          value={treesPlanted} 
          trend={+2}
          delay={0.1}
        />
        <StatItem 
          icon="🗑️" 
          label="Waste Collected" 
          value={wasteCollected} 
          unit="kg" 
          trend={+5}
          delay={0.2}
        />
        <StatItem 
          icon="🏆" 
          label="Community Rank" 
          value={`#${rank}`} 
          trend={-3}
          trendPositive={true}
          delay={0.3}
        />
        <StatItem 
          icon="🦊" 
          label="Species Found" 
          value={speciesDiscovered} 
          trend={+1}
          delay={0.4}
        />
        <StatItem 
          icon="🌍" 
          label="Carbon Saved" 
          value={carbonSaved} 
          unit="kg" 
          trend={+15}
          delay={0.5}
        />
        <StatItem 
          icon="📅" 
          label="Events Joined" 
          value={eventsAttended} 
          trend={+1}
          delay={0.6}
        />
      </div>

      {/* Achievements section */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Recent Achievements</h4>
        <div className="flex flex-wrap gap-2">
          <Achievement icon="🌱" label="First Planting" />
          <Achievement icon="♻️" label="Recycling Pro" />
          <Achievement icon="🔍" label="Species Spotter" />
          <Achievement icon="🤝" label="Community Helper" />
        </div>
      </div>
    </motion.div>
  );
};

// Stat item component
const StatItem = ({ icon, label, value, unit = "", trend = 0, trendPositive = null, delay = 0 }) => {
  // If trendPositive is not explicitly set, positive trend numbers are good
  const isTrendPositive = trendPositive !== null ? trendPositive : trend > 0;
  const trendColor = isTrendPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
  
  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 p-4 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold text-neutral-800 dark:text-white mb-1">
        {value}{unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{label}</div>
      {trend !== 0 && (
        <div className={`text-xs mt-1 flex items-center ${trendColor}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}
        </div>
      )}
    </motion.div>
  );
};

// Achievement badge component
const Achievement = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-700/50 rounded-full py-1 px-3">
    <span>{icon}</span>
    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
  </div>
);

export default UserStatsCard;