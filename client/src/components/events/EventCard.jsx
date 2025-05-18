import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const EventCard = ({ 
  event, 
  currentUserId, 
  onEdit, 
  onDelete, 
  variant = 'default',
  className = '' 
}) => {
  const { 
    id, 
    title, 
    description, 
    date, 
    time, 
    location, 
    category, 
    spots, 
    registered, 
    createdBy, 
    organizer,
    image
  } = event;

  // Check if user is the creator of the event
  const isEventCreator = createdBy === currentUserId;
  
  // Calculate spots remaining and percentage filled
  const spotsRemaining = spots - registered;
  const percentageFilled = Math.round((registered / spots) * 100);
  
  // Determine category badge color
  const getCategoryColor = (category) => {
    const categoryColors = {
      'Cleanup': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Workshop': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Photography': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'Conservation': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Education': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    };
    
    return categoryColors[category] || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300';
  };

  // Compact variant (for dashboard, sidebar, etc.)
  if (variant === 'compact') {
    return (
      <motion.div 
        whileHover={{ y: -4 }}
        className={`bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-100 dark:border-neutral-700 overflow-hidden ${className}`}
      >
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-700 dark:text-primary-300">
              {category === 'Cleanup' && '🧹'}
              {category === 'Workshop' && '🔧'}
              {category === 'Photography' && '📸'}
              {category === 'Conservation' && '🌿'}
              {category === 'Education' && '📚'}
              {!['Cleanup', 'Workshop', 'Photography', 'Conservation', 'Education'].includes(category) && '📅'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">{title}</h4>
            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span className="truncate">{date} • {location}</span>
            </div>
          </div>
          <Link 
            to={`/events/${id}`}
            className="ml-2 flex-shrink-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
          >
            View
          </Link>
        </div>
      </motion.div>
    );
  }

  // Featured variant (for homepage, highlighted events)
  if (variant === 'featured') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-100 dark:border-neutral-700 overflow-hidden group ${className}`}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
            <div className="flex items-center text-sm text-white/80 mt-1">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date} at {time}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{location}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 mr-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400">Organizer</span>
                <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">{organizer.name}</span>
              </div>
            </div>
            <Link 
              to={`/events/${id}`}
              className="btn btn-sm btn-primary"
            >
              Join Event
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant (for events page, listings)
  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-neutral-800 rounded-xl shadow-soft border border-neutral-100 dark:border-neutral-700 overflow-hidden ${className}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {registered}/{spots} registered
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{description}</p>
        {event.communityId?.name && (
          <p className="text-xs text-green-700 font-semibold mb-2">Community: {event.communityId.name}</p>
        )}
        {event.communityName && !event.communityId?.name && (
          <p className="text-xs text-green-700 font-semibold mb-2">Community: {event.communityName}</p>
        )}
        
        <div className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{organizer.name}</span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2">({organizer.type})</span>
            </div>
          </div>
        </div>
        
        {/* Registration progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-neutral-600 dark:text-neutral-400">{spotsRemaining} spots left</span>
            <span className="text-primary-600 dark:text-primary-400">{percentageFilled}% filled</span>
          </div>
          <div className="h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
              style={{ width: `${percentageFilled}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/events/${id}`}
            className="btn btn-sm btn-primary"
          >
            Learn More
          </Link>
          
          {isEventCreator && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit && onEdit(event)}
                className="btn btn-sm btn-outline-primary"
              >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(event)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
              >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string,
    spots: PropTypes.number,
    registered: PropTypes.number,
    createdBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    image: PropTypes.string
  }).isRequired,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'featured']),
  className: PropTypes.string
};

export default EventCard;