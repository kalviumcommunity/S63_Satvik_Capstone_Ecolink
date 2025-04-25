import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';

// --- Specific Dashboard Components ---
const WelcomeHeader = ({ name }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">Welcome Back, {name}</h1>
    <p className="text-xl text-gray-600">Here's your environmental impact overview</p>
  </motion.div>
);

const ImpactCard = ({ icon, label, value, unit }) => (
  <Card hover variant="elevated" className="text-center p-6">
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-800">
      {value} <span className="text-base font-normal text-gray-600">{unit}</span>
    </p>
  </Card>
);

const EventCard = ({ title, date, time, location, organizer, image }) => (
  <Card hover className="p-0">
    <Card.Body className="flex items-center gap-4">
      <img src={image} alt={title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 text-lg mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-1">
          📅 {date} • {time}
        </p>
        <p className="text-sm text-gray-500">📍 {location}</p>
        <p className="text-sm text-gray-500 mt-1">👥 {organizer}</p>
      </div>
      <Link 
        to="/events" 
        className="text-sm font-semibold text-primary-600 border-2 border-primary-600 rounded-full 
                 px-4 py-2 hover:bg-primary-50 transition-colors flex-shrink-0"
      >
        View All
      </Link>
    </Card.Body>
  </Card>
);

const EcoTipCard = ({ tip }) => (
  <Card hover variant="outline" className="p-6">
    <div className="flex items-center gap-4">
      <div className="text-4xl bg-primary-50 rounded-full p-3 text-primary-600">💡</div>
      <p className="text-lg text-gray-700">{tip}</p>
    </div>
  </Card>
);

const RankCard = ({ rank }) => (
  <Card hover variant="elevated" className="p-6 text-center bg-gradient-to-br from-primary-50 to-white">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Rank</h3>
    <p className="text-4xl font-bold text-primary-600">#{rank}</p>
    <p className="text-sm text-gray-600 mt-2">Keep it up! You're making a difference.</p>
  </Card>
);

const PetCard = ({ name, image, level, growth }) => (
  <Card hover variant="elevated" className="p-6">
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Virtual Pet</h3>
      <div className="relative inline-block">
        <img 
          src={image} 
          alt={name} 
          className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mb-4" 
        />
        <div className="absolute -bottom-2 right-0 bg-primary-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
          Level {level}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-lg font-medium text-gray-800">{name}</p>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${growth}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">Growth: {growth}%</p>
        <Link 
          to="/virtual-pet"
          className="inline-flex items-center justify-center w-full bg-primary-600 text-white rounded-full 
                   py-2 px-4 hover:bg-primary-700 transition-colors"
        >
          Visit Pet
        </Link>
      </div>
    </div>
  </Card>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
  // Sample data
  const userName = "Satvik";
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
  const virtualPet = {
    name: "Eco Tiger",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1470&auto=format&fit=crop", // Placeholder tiger
    level: 3,
    growth: 60
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader name={userName} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Environment Impact */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Environmental Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ImpactCard icon="🌳" label="Trees Planted" value={treesPlanted} unit="" />
                <ImpactCard icon="🗑️" label="Waste Collected" value={wasteCollected} unit="Kg" />
                <ImpactCard icon="🏅" label="Eco-points Earned" value={ecoPoints} unit="pt" />
              </div>
            </section>

            {/* Upcoming Events */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <EventCard {...upcomingEvent} />
            </section>

            {/* Eco-Tips */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Daily Eco-Tip</h3>
              <EcoTipCard tip={ecoTip} />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RankCard rank={userRank} />
            <PetCard {...virtualPet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
