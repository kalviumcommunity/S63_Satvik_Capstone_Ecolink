import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();

  // Simulated events data - In a real app, this would come from an API call
  const eventsData = {
    '1': {
      id: 1,
      title: 'Beach Cleanup Drive',
      description: 'Join us for a community beach cleanup event to protect marine life and keep our beaches clean.',
      date: 'March 25, 2024',
      time: '9:00 AM',
      location: 'Sunset Beach',
      category: 'Cleanup',
      spots: 50,
      registered: 35,
      organizer: {
        name: 'Ocean Conservation Society',
        type: 'Environmental NGO'
      },
      fullDescription: `Join us for an impactful day at the beach! Our community beach cleanup event aims to protect marine life and maintain the pristine condition of our beaches. Together, we can make a significant difference in preserving our coastal environment.

      What to expect:
      - Professional guidance on safe cleanup practices
      - Equipment provided (gloves, bags, grabbers)
      - Educational talks about marine conservation
      - Certificate of participation
      - Refreshments provided

      Don't forget to:
      - Wear comfortable clothes and shoes
      - Bring sunscreen and a hat
      - Bring a reusable water bottle
      
      Your participation helps protect marine life and preserves our beautiful beaches for future generations.`
    },
    '2': {
      id: 2,
      title: 'Tree Planting Workshop',
      description: 'Learn about local tree species and participate in our urban forestation initiative.',
      date: 'April 5, 2024',
      time: '10:00 AM',
      location: 'Central Park',
      category: 'Workshop',
      spots: 30,
      registered: 15,
      organizer: {
        name: 'Green Earth Foundation',
        type: 'Environmental Organization'
      },
      fullDescription: `Join us for an educational and impactful tree planting workshop! Learn about native tree species and contribute to urban forestation while making our city greener.

      What to expect:
      - Expert guidance on tree planting techniques
      - Information about local tree species
      - Hands-on planting experience
      - Tree care workshop
      - Take-home saplings
      
      Workshop includes:
      - All planting tools and materials
      - Educational materials
      - Refreshments
      - Certificate of participation
      
      Please note:
      - Wear comfortable clothing and closed-toe shoes
      - Bring gardening gloves if you have them
      - Bring a water bottle
      
      Your participation helps create a greener future for our community!`
    },
    '3': {
      id: 3,
      title: 'Wildlife Photography Walk',
      description: 'Capture the beauty of local wildlife with professional photographers.',
      date: 'April 15, 2024',
      time: '7:00 AM',
      location: 'Nature Reserve',
      category: 'Photography',
      spots: 20,
      registered: 12,
      organizer: {
        name: 'Wildlife Conservation Group',
        type: 'Nature Society'
      },
      fullDescription: `Join professional wildlife photographers for an immersive morning of nature photography! Learn techniques for capturing stunning wildlife images while exploring our local nature reserve.

      What you'll learn:
      - Wildlife photography basics
      - Camera settings for nature shots
      - Animal behavior observation
      - Best practices for wildlife photography
      - Post-processing tips
      
      What to bring:
      - Your camera (DSLR/Mirrorless preferred)
      - Zoom lens if available
      - Comfortable walking shoes
      - Water and snacks
      - Weather-appropriate clothing
      
      Additional Information:
      - Suitable for all skill levels
      - Some loaner equipment available
      - Early morning start for best light
      - Small group size for personal attention
      
      This is a unique opportunity to improve your photography skills while connecting with nature!`
    }
  };

  // Get the event data based on the ID
  const event = eventsData[id];

  // Handle case when event is not found
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-green-600 text-white px-6 py-8">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-lg opacity-90">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Key Information */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <span className="block">Organized by: {event.organizer.name}</span>
                    <span className="text-sm text-gray-500">{event.organizer.type}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Registration Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Registration Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Available Spots:</span>
                    <span className="font-semibold">{event.spots - event.registered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Spots:</span>
                    <span className="font-semibold">{event.spots}</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(event.registered / event.spots) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.registered} people have registered
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>

            {/* Full Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <div className="prose max-w-none">
                {event.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 