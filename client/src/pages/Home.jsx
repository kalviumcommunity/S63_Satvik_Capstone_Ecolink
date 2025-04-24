import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import FileUpload from '../components/upload/FileUpload';

const Home = () => {
  // Static events data
  const staticEvents = [
    {
      id: 1,
      title: "Weekend Tree Planting",
      description: "Join us for a day of tree planting in the city park. All equipment provided!",
      date: "2024-03-15",
      time: "09:00",
      location: "City Central Park"
    },
    {
      id: 2,
      title: "Beach Cleanup Drive",
      description: "Help us clean the coastline and protect marine life. Every piece of plastic counts!",
      date: "2024-03-20",
      time: "08:00",
      location: "Sunset Beach"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-2">Welcome to EcoLink 🌿</h1>
      <p className="text-gray-700 text-lg mb-10">Join the movement. Make an impact.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {[<LoginForm key="login" />, <SignUpForm key="signup" />].map((Form, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">{Form}</div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-8">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Upload a File</h2>
        <FileUpload />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-8">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Upcoming Events</h2>
        {staticEvents.map(event => (
          <div key={event.id} className="mb-4 border-b pb-2">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date} - {event.time}</p>
            <p>{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
