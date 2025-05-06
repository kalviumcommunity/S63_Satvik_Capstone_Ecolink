import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpeciesCard from './SpeciesCard';

// Mock data for demonstration purposes
const mockFavoriteSpecies = [
  {
    id: 1,
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    imageUrl: '/images/species/bengal-tiger.jpg',
    description: 'The Bengal tiger is the most numerous tiger subspecies. Its populations have been estimated at 2,500 in the wild.',
    habitat: 'Forest',
    region: 'Asia',
    conservationStatus: 'Endangered',
    sightings: 120,
    favorites: 85
  },
  {
    id: 2,
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    imageUrl: '/images/species/blue-whale.jpg',
    description: 'The blue whale is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters and weight of 173 tonnes, it is the largest animal known to have ever existed.',
    habitat: 'Ocean',
    region: 'Global',
    conservationStatus: 'Endangered',
    sightings: 45,
    favorites: 67
  },
  {
    id: 3,
    name: 'Rafflesia',
    scientificName: 'Rafflesia arnoldii',
    imageUrl: '/images/species/rafflesia.jpg',
    description: 'Rafflesia arnoldii is a species of flowering plant noted for producing the largest individual flower on Earth.',
    habitat: 'Rainforest',
    region: 'Southeast Asia',
    conservationStatus: 'Vulnerable',
    sightings: 32,
    favorites: 28
  }
];

const FavoriteSpecies = ({ limit, showViewAll = true }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'sightings', 'recent'

  useEffect(() => {
    // Simulate API call to fetch favorite species
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch('/api/user/favorites');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setFavorites(mockFavoriteSpecies);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load favorite species. Please try again later.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Sort favorites based on selected option
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sightings':
        return b.sightings - a.sightings;
      case 'favorites':
        return b.favorites - a.favorites;
      default:
        return 0;
    }
  });

  // Limit the number of species shown if specified
  const displayedFavorites = limit ? sortedFavorites.slice(0, limit) : sortedFavorites;

  // Handle toggling a species as favorite/unfavorite
  const handleFavoriteToggle = (speciesId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(species => species.id !== speciesId)
    );
  };

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
      transition: { duration: 0.5 }
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Favorite Species</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Favorite Species</h2>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          <p>{error}</p>
          <button 
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (favorites.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Favorite Species</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No Favorite Species Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Start exploring and add species to your favorites</p>
          <Link 
            to="/species" 
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Explore Species
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Header with title and sort options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Favorite Species</h2>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-by" className="text-sm text-gray-600 dark:text-gray-400">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="name">Name</option>
            <option value="sightings">Most Sightings</option>
            <option value="favorites">Most Popular</option>
          </select>
        </div>
      </div>
      
      {/* Species cards grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedFavorites.map((species) => (
          <motion.div key={species.id} variants={itemVariants}>
            <SpeciesCard 
              species={species} 
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* View all link */}
      {showViewAll && favorites.length > limit && (
        <div className="mt-8 text-center">
          <Link 
            to="/species/favorites" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>View All Favorites</span>
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoriteSpecies;