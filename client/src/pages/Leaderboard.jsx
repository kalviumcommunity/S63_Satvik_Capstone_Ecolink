import React from 'react';

// Define badge icons (simple examples)
const badgeIcons = {
  tree: '🌳',
  water: '💧',
  recycle: '♻️',
  event: '⭐',
  volunteer: '🤝',
  solar: '☀️'
};

const PlaceholderAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  </div>
);

const LeaderboardRow = ({ rank, user, badges, points, isTopUser }) => (
  <div className={`flex items-center py-3 px-4 border-b border-gray-200 text-sm ${isTopUser ? 'bg-green-100 rounded-lg' : ''}`}>
    <div className="w-12 text-center font-medium text-gray-600">{rank}</div>
    <div className="flex-grow flex items-center gap-3">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <PlaceholderAvatar />
      )}
      <span className="font-medium text-gray-800">{user.name}</span>
    </div>
    <div className="w-32 flex items-center gap-1">
      {badges.map((badgeKey, index) => (
        <span key={index} title={badgeKey} className="text-lg">{badgeIcons[badgeKey] || '❓'}</span>
      ))}
    </div>
    <div className="w-20 text-right font-semibold text-gray-800">{points}</div>
  </div>
);

const Leaderboard = () => {
  // Updated sample data
  const leaderboardData = [
    {
      rank: 1,
      user: { name: "Emma Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
      badges: ['solar', 'recycle', 'event'],
      points: 1500
    },
    {
      rank: 2,
      user: { name: "Alex Martinez", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
      badges: ['water', 'recycle', 'tree'],
      points: 1350
    },
    {
      rank: 3,
      user: { name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
      badges: ['solar', 'tree', 'event'],
      points: 1180
    },
    {
      rank: 4,
      user: { name: "John Doe", avatar: null }, // Placeholder avatar
      badges: ['volunteer', 'tree', 'recycle'],
      points: 980
    },
    {
      rank: 5,
      user: { name: "Fatima Khan", avatar: null }, // Placeholder avatar
      badges: ['tree', 'water', 'recycle'],
      points: 860
    },
    {
      rank: 6,
      user: { name: "David Smith", avatar: null }, // Placeholder avatar
      badges: ['volunteer', 'tree', 'recycle'],
      points: 750
    },
    {
      rank: 7,
      user: { name: "Sarah Wilson", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
      badges: ['volunteer', 'tree', 'recycle'],
      points: 690
    },
    {
      rank: 8,
      user: { name: "Laura Gómez", avatar: null }, // Placeholder avatar
      badges: ['volunteer', 'tree', 'event'],
      points: 600
    },
    {
      rank: 9,
      user: { name: "Rachel Brown", avatar: null }, // Placeholder avatar
      badges: ['volunteer', 'tree', 'event'],
      points: 580
    },
    {
      rank: 10,
      user: { name: "Michael Lee", avatar: null }, // Placeholder avatar
      badges: ['volunteer', 'recycle'],
      points: 510
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-green-700 mb-1">Leaderboard</h1>
          <p className="text-gray-600">Top Contributors in the Community</p>
        </div>

        {/* Table Header */}
        <div className="flex items-center py-3 px-4 bg-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="w-12 text-center">#</div>
          <div className="flex-grow">User</div>
          <div className="w-32">Badges</div>
          <div className="w-20 text-right">Points</div>
        </div>

        {/* Leaderboard List */}
        <div>
          {leaderboardData.map((entry, index) => (
            <LeaderboardRow
              key={entry.rank}
              {...entry}
              isTopUser={index === 0} // Highlight only the first user
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 