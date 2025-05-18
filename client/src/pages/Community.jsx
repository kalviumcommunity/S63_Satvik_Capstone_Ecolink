import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CommunityEvents from '../components/CommunityEvents';

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

const Community = () => {
  const { currentUser } = useAuth();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createEventFor, setCreateEventFor] = useState(null);

  if (!currentUser) return null;
  const userId = String(currentUser?._id || currentUser?.id);

  // Fetch communities from backend
  const fetchCommunities = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/communities');
      const data = await res.json();
      setCommunities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load communities');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  // Handle join community
  const handleJoin = async (communityId) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/communities/${communityId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to join community');
      fetchCommunities();
    } catch (err) {
      setError('Failed to join community');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !description) {
      setError('Name and description are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });
      if (!res.ok) throw new Error('Failed to create community');
      setName('');
      setDescription('');
      fetchCommunities();
    } catch (err) {
      setError('Failed to create community');
    }
  };

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

        {/* Create Community Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-green-700">Create a Community</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4 md:flex-row md:items-end">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Community Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Create
            </button>
          </form>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        {/* Community List */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-green-700">All Communities</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {communities.map((c, index) => {
                // Handle owner as string or {_id: ...}
                const ownerId = typeof c.owner === 'object' && c.owner !== null ? String(c.owner._id) : String(c.owner);
                const isOwner = ownerId === userId;
                // Handle members as string or {_id: ...}
                const memberIds = c.members ? c.members.map(m => typeof m === 'object' && m !== null ? String(m._id) : String(m)) : [];
                const isMember = isOwner || memberIds.includes(userId);
                console.log('userId:', userId, 'community.owner:', c.owner, 'ownerId:', ownerId, 'isOwner:', isOwner, 'memberIds:', memberIds, 'isMember:', isMember);
                return (
                  <div
                    key={c._id}
                    className={`py-4 flex flex-col md:flex-row md:items-center justify-between ${index !== communities.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">{c.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      {isOwner && <span className="px-3 py-1 bg-green-200 text-green-800 rounded">Joined (Owner)</span>}
                      {!isOwner && isMember && <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded">Joined</span>}
                      {!isOwner && !isMember && (
                        <button
                          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          onClick={() => handleJoin(c._id)}
                        >
                          Join Community
                        </button>
                      )}
                    </div>
                    {/* Show events for joined communities only */}
                    {(isOwner || isMember) && (
                      <CommunityEvents community={c} showCreateForm={createEventFor === c._id} onCloseCreateForm={() => setCreateEventFor(null)} />
                    )}
                    {/* Only show join-to-view message to non-members who are not owner */}
                    {!isOwner && !isMember && (
                      <span style={{ color: 'red', marginLeft: 8 }}>Join this community to view events.</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Community; 