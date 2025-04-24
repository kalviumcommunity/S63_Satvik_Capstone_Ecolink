import React from 'react';
import { Link } from 'react-router-dom';

// --- Reusable Card Component (Optional but recommended) ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-green-50 rounded-lg p-4 shadow-sm ${className}`}>
    {children}
  </div>
);

// --- Specific Dashboard Components ---
const WelcomeHeader = ({ name }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-green-700">Dashboard</h1>
    <p className="text-gray-600">Welcome Back, {name}</p>
  </div>
);

const ImpactCard = ({ icon, label, value, unit }) => (
  <Card className="text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-xl font-bold text-gray-800">
      {value} <span className="text-base font-normal text-gray-600">{unit}</span>
    </p>
  </Card>
);

const EventCard = ({ title, date, time, location, organizer, image }) => (
  <Card className="flex items-center gap-4">
    <img src={image} alt={title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
    <div className="flex-grow">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500">
        📅 {date} • {time}
      </p>
      <p className="text-xs text-gray-500">📍 {location}</p>
      <p className="text-xs text-gray-500 mt-1">👥 {organizer}</p>
    </div>
    <Link to="/events" className="text-xs text-green-600 border border-green-600 rounded-full px-3 py-1 hover:bg-green-100 flex-shrink-0">
      View-all
    </Link>
  </Card>
);

const EcoTipCard = ({ tip }) => (
  <Card className="flex items-center gap-4">
    <div className="text-3xl bg-white rounded-full p-2">💡</div>
    <p className="text-sm text-gray-600 flex-1">{tip}</p>
  </Card>
);

const RankCard = ({ rank }) => (
  <Card className="text-center">
    <p className="text-gray-600 font-medium">My Rank: <span className="text-xl font-bold text-gray-800">{rank}</span></p>
  </Card>
);

const PetCard = ({ name, image, level, growth }) => (
  <Card className="flex flex-col items-center">
    <h3 className="font-semibold text-gray-800 mb-3">Virtual Pet</h3>
    <img src={image} alt={name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-3" />
    <div className="text-sm text-gray-600 mb-1">Level {level}</div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${growth}%` }}></div>
    </div>
    <p className="text-xs text-gray-500 mb-3">Growth: {growth}%</p>
    <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
       </svg>
    </button>
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
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJvbnQlMjBlbmQlMjBkZXZlbG9wZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" // Placeholder image
  };
  const ecoTip = "Reduce plastic use! Carry a reusable water bottle and shopping bag to minimize single-use plastics.";
  const virtualPet = {
    name: "Eco Tiger",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%3D", // Placeholder tiger
    level: 3,
    growth: 60
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <WelcomeHeader name={userName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Environment Impact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Environment Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ImpactCard icon="🌳" label="Trees Planted" value={treesPlanted} unit="" />
              <ImpactCard icon="🗑️" label="Waste Collected" value={wasteCollected} unit="Kg" />
              <ImpactCard icon="🏅" label="Eco-point Earned" value={ecoPoints} unit="pt" />
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
            <EventCard {...upcomingEvent} />
          </div>

          {/* Eco-Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Eco-Tips</h3>
            <EcoTipCard tip={ecoTip} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RankCard rank={userRank} />
          <PetCard {...virtualPet} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
