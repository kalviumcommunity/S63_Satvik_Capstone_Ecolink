import React from 'react';

// Updated CommunityIcon to use an embedded SVG
const CommunityIcon = () => (
  // Adjusted styling for SVG container
  <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-green-200">
    {/* Embedded User Group SVG Icon */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="1.5" // Adjusted stroke width for visibility
      stroke="currentColor" 
      className="w-16 h-16 md:w-20 md:h-20 text-green-700" // Adjusted size and color
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" 
      />
    </svg>
  </div>
);

// Component for a single message card
const MessageCard = ({ orgName, message, timeAgo, isLast }) => (
  <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
    <h4 className="font-semibold text-gray-800">{orgName}</h4>
    <p className="text-sm text-gray-600 mt-1">{message}</p>
    <p className="text-xs text-gray-400 mt-2">{timeAgo}</p>
  </div>
);

// Main Community Page Component
const Community = () => {
  // Sample message data
  const messages = [
    {
      orgName: "Green Earth Alliance",
      message: "Excited for the community garden launch this Sunday!",
      timeAgo: "1h ago"
    },
    {
      orgName: "Ocean Guardians",
      message: "Planning our next beach cleaning event. Dates coming soon!",
      timeAgo: "4h ago"
    },
    {
      orgName: "Wildlife Protectors",
      message: "Thanks to all who supported the wildlife fundraiser yesterday!",
      timeAgo: "8h ago"
    },
    {
      orgName: "EcoFuture",
      message: "Any recommendations for sustainable event suppliers? ♻️",
      timeAgo: "1d ago"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Community Message</h1>
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search Community"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Icon */}
          <div className="flex justify-center md:justify-start">
             <CommunityIcon />
          </div>
         
          {/* Right Message Feed */}
          <div className="flex-grow bg-white rounded-lg shadow-sm p-6">
            {messages.map((msg, index) => (
              <MessageCard 
                key={index} 
                {...msg} 
                isLast={index === messages.length - 1} 
              />
            ))}
             {/* Placeholder for more actions if needed */}
             <div className="text-center mt-4">
                <span className="text-gray-400 text-xl">...</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community; 