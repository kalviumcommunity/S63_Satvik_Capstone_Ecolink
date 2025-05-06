import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const UpcomingEvents = ({ limit = 3, showViewAll = true, variant = 'default' }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock current user ID - In a real app, this would come from auth context
  const currentUserId = 1;

  useEffect(() => {
    // Simulate API call to fetch events
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockEvents = [
          {
            id: 1,
            title: 'Beach Cleanup Drive',
            description: 'Join us for a community beach cleanup event to protect marine life and keep our beaches clean.',
            date: 'March 25, 2024',
            time: '9:00 AM',
            location: 'Sunset Beach',
            category: 'Cleanup',
            spots: 50,
            registered: 35,
            createdBy: 1,
            organizer: {
              name: 'Ocean Conservation Society',
              type: 'Environmental NGO'
            },
            image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            title: 'Tree Planting Workshop',
            description: 'Learn about local tree species and participate in our urban forestation initiative.',
            date: 'April 5, 2024',
            time: '10:00 AM',
            location: 'Central Park',
            category: 'Workshop',
            spots: 30,
            registered: 15,
            createdBy: 2,
            organizer: {
              name: 'Green Earth Foundation',
              type: 'Environmental Organization'
            },
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 3,
            title: 'Wildlife Photography Walk',
            description: 'Capture the beauty of local wildlife with professional photographers.',
            date: 'April 15, 2024',
            time: '7:00 AM',
            location: 'Nature Reserve',
            category: 'Photography',
            spots: 20,
            registered: 12,
            createdBy: 1,
            organizer: {
              name: 'Wildlife Conservation Group',
              type: 'Nature Society'
            },
            image: 'https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 4,
            title: 'Environmental Education Workshop',
            description: 'Learn about sustainable practices and how to reduce your carbon footprint.',
            date: 'April 20, 2024',
            time: '2:00 PM',
            location: 'Community Center',
            category: 'Education',
            spots: 40,
            registered: 22,
            createdBy: 3,
            organizer: {
              name: 'EcoLearn Initiative',
              type: 'Educational Organization'
            },
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 5,
            title: 'Coral Reef Conservation Project',
            description: 'Help monitor and protect local coral reef ecosystems.',
            date: 'May 10, 2024',
            time: '8:00 AM',
            location: 'Marine Research Center',
            category: 'Conservation',
            spots: 15,
            registered: 10,
            createdBy: 2,
            organizer: {
              name: 'Marine Protection Alliance',
              type: 'Conservation Group'
            },
            image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setEvents(mockEvents.slice(0, limit));
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [limit]);

  // Handle edit event (in a real app, this would open a modal or navigate to edit page)
  const handleEdit = (event) => {
    console.log('Edit event:', event);
    // Implementation would depend on your app's requirements
  };

  // Handle delete event (in a real app, this would show a confirmation dialog)
  const handleDelete = (event) => {
    console.log('Delete event:', event);
    // Implementation would depend on your app's requirements
  };

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header with title and view all link */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Upcoming Events</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Join environmental activities in your area</p>
        </div>
        
        {showViewAll && (
          <Link 
            to="/events" 
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
          >
            View all
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Events grid */}
      {!loading && !error && events.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            variant === 'compact' 
              ? 'space-y-3' 
              : variant === 'featured'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 gap-6'
          }
        >
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              variant={variant}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && !error && events.length === 0 && (
        <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
          <svg className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-neutral-900 dark:text-white">No upcoming events</h3>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Check back later for new events or create your own!</p>
          <div className="mt-6">
            <Link
              to="/events/create"
              className="btn btn-primary"
            >
              Create Event
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;