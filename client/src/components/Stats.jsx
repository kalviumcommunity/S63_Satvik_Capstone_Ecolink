import React from 'react';

const StatCard = ({ icon, number, label }) => (
  <div className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
    <div className="text-5xl mb-4 text-green-600 animate-bounce">{icon}</div>
    <div className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-gray-600 text-lg">{label}</div>
  </div>
);

const Stats = () => {
  const stats = [
    {
      icon: "🌳",
      number: "1200+",
      label: "Trees Planted",
    },
    {
      icon: "👥",
      number: "450+",
      label: "Volunteers",
    },
    {
      icon: "🌍",
      number: "50+",
      label: "Events Held",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Together, We Make a Difference
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our community's impact grows stronger with every action we take
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 