import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SpeciesCard = ({ 
  species, 
  variant = 'default',
  onFavoriteToggle,
  isFavorite = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if we have an image or need a placeholder
  const hasImage = species.imageUrl && species.imageUrl !== '';
  
  // Variants for different card styles
  const cardVariants = {
    default: "max-w-sm w-full",
    compact: "max-w-xs w-full",
    featured: "max-w-md w-full"
  };
  
  // Animation variants
  const cardMotionVariants = {
    hover: { 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    initial: { 
      y: 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Conservation status colors and labels
  const conservationStatus = {
    'Least Concern': { color: 'bg-green-500', label: 'Least Concern' },
    'Near Threatened': { color: 'bg-yellow-500', label: 'Near Threatened' },
    'Vulnerable': { color: 'bg-orange-500', label: 'Vulnerable' },
    'Endangered': { color: 'bg-red-500', label: 'Endangered' },
    'Critically Endangered': { color: 'bg-red-700', label: 'Critically Endangered' },
    'Extinct in the Wild': { color: 'bg-purple-700', label: 'Extinct in Wild' },
    'Extinct': { color: 'bg-gray-700', label: 'Extinct' },
    'Data Deficient': { color: 'bg-gray-500', label: 'Data Deficient' },
    'Not Evaluated': { color: 'bg-gray-400', label: 'Not Evaluated' }
  };
  
  // Get status color and label or use default
  const status = conservationStatus[species.conservationStatus] || 
    { color: 'bg-gray-400', label: 'Unknown' };
  
  return (
    <motion.div
      className={`${cardVariants[variant]} relative`}
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={cardMotionVariants}
    >
      {/* Card Container with glass effect */}
      <div className="relative h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-primary-900/20 dark:to-secondary-900/20 z-0"></div>
        
        {/* Conservation Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color} text-white`}>
            {status.label}
          </span>
        </div>
        
        {/* Favorite Button */}
        <motion.button
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          onClick={() => onFavoriteToggle && onFavoriteToggle(species.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </motion.button>
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {hasImage ? (
            <img 
              src={species.imageUrl} 
              alt={species.name} 
              className="w-full h-full object-cover transition-transform duration-500 ease-out transform group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-300 dark:text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          )}
          
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Species name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">{species.name}</h3>
            <p className="text-sm text-gray-200 italic">{species.scientificName}</p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="relative p-5 z-10">
          {/* Habitat and Region */}
          <div className="flex flex-wrap gap-2 mb-4">
            {species.habitat && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                {species.habitat}
              </span>
            )}
            
            {species.region && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {species.region}
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {species.description || "No description available for this species."}
          </p>
          
          {/* Sightings and Interactions */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{species.sightings || 0} sightings</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{species.favorites || 0} favorites</span>
            </div>
          </div>
          
          {/* Action Button */}
          <Link 
            to={`/species/${species.id}`}
            className="relative group w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-lg blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <button className="relative w-full px-4 py-2 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center gap-2">
              <span>View Details</span>
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

SpeciesCard.propTypes = {
  species: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    scientificName: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    habitat: PropTypes.string,
    region: PropTypes.string,
    conservationStatus: PropTypes.string,
    sightings: PropTypes.number,
    favorites: PropTypes.number
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact', 'featured']),
  onFavoriteToggle: PropTypes.func,
  isFavorite: PropTypes.bool
};

export default SpeciesCard;