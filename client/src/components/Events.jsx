import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, description, image }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div className="relative h-48">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <div className="flex space-x-2">
        <Link
          to="/events"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Join
        </Link>
        <Link
          to={`/events/${id}`}
          className="inline-block border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
);

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Weekend Tree Planting",
      description: "Join us for a day of tree planting in the city park. All equipment provided!",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Beach Cleanup Drive",
      description: "Help us clean the coastline and protect marine life. Every piece of plastic counts!",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Urban Garden Workshop",
      description: "Learn how to start your own sustainable garden in limited space.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3",
    },
  ];

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Discover Upcoming Events with Our Community 🌍
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our community events and make a real difference in your local environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events; 