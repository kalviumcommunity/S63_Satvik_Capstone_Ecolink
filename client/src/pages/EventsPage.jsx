import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function formatEventDate(dateStr, timeStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formatted = date.toLocaleDateString(undefined, options);
  if (timeStr) formatted += ` · ${timeStr}`;
  return formatted;
}

const EventsPage = () => {
  const { currentUser, hasRole } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');
  const [ownedCommunities, setOwnedCommunities] = useState([]);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerMode, setRegisterMode] = useState('solo');
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', teamName: '', members: [{ name: '', email: '' }] });
  const [registerEventId, setRegisterEventId] = useState(null);
  const [registerStatus, setRegisterStatus] = useState('');

  // Fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      console.log('Fetched events:', data); // Debug log
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch communities owned by the current user
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/communities');
        const data = await res.json();
        const userId = currentUser?._id || currentUser?.id;
        const owned = data.filter(c => c.owner === userId);
        setOwnedCommunities(owned);
      } catch (err) {
        // ignore error for now
      }
    };
    if (currentUser) fetchCommunities();
  }, [currentUser]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Check if user is the creator of the event
  const isEventCreator = (event) => {
    const userId = currentUser?.id || currentUser?._id;
    if (!event.createdBy) return false;
    if (typeof event.createdBy === 'object' && event.createdBy !== null) {
      return event.createdBy._id === userId;
    }
    return event.createdBy === userId;
  };

  // Handle edit event
  const handleEdit = (event) => {
    if (isEventCreator(event)) {
      setEditingEvent(event);
    }
  };

  // Handle update event (not implemented for backend yet)
  const handleUpdate = (e) => {
    e.preventDefault();
    // You can implement update logic here if needed
    setEditingEvent(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (event) => {
    if (isEventCreator(event)) {
      setEventToDelete(event);
      setShowDeleteModal(true);
    }
  };

  // Handle delete event (not implemented for backend yet)
  const handleDelete = () => {
    // You can implement delete logic here if needed
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  // Show edit/delete if user is creator or admin
  const canEditOrDelete = (event) => {
    return isEventCreator(event) || hasRole('admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Environmental Events</h1>
            {ownedCommunities.length > 0 && (
              <button
                onClick={() => setShowCreate(s => !s)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {showCreate ? 'Close Create Event Form' : 'Create Event'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filters (not functional) */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option>All Categories</option>
                <option>Cleanup</option>
                <option>Workshop</option>
                <option>Photography</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Error/Loading Feedback */}
        {error && <div style={{ color: 'red', margin: 10 }}>{error}</div>}
        {loading && <div style={{ color: 'blue', margin: 10 }}>Loading events...</div>}

        {/* Events List */}
        <div>
          {events.map(event => (
            <motion.div
              key={event._id || event.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex bg-white shadow rounded-lg overflow-hidden mb-4"
            >
              {/* Event Image */}
              <img
                src={event.imageUrl ? `http://localhost:5000${event.imageUrl}` : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}
                alt={event.title}
                className="w-32 h-32 object-cover"
              />
              {/* Event Details */}
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="text-gray-700 text-sm mb-1">{event.description}</p>
                <div className="flex items-center text-green-700 text-sm mt-1 gap-4">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatEventDate(event.date)}
                  </span>
                  {event.time && (
                    <span className="flex items-center text-blue-700">
                      <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                      {event.time}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium text-green-700 text-sm truncate">
                    {event.communityId?.name || event.communityName || 'Unknown Organization'}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-4 pb-1 text-gray-500 text-sm">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {event.registrationCount || 0} registered
                </div>
                <div className="mt-4 flex justify-between items-center">
                  {canEditOrDelete(event) && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(event)}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition shadow"
                    onClick={() => {
                      setShowRegisterModal(true);
                      setRegisterEventId(event._id || event.id);
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal, Delete Modal, and CreateEventForm remain unchanged */}
        <AnimatePresence>
          {editingEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
              >
                <form onSubmit={handleUpdate} className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="text"
                          value={editingEvent.date}
                          onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="text"
                          value={editingEvent.time}
                          onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={editingEvent.location}
                        onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Delete Event</h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {showCreate && <CreateEventForm onCreated={fetchEvents} ownedCommunities={ownedCommunities} />}

        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowRegisterModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Event Registration</h2>
              <div className="mb-4 flex gap-4">
                <button
                  className={`px-4 py-2 rounded-lg font-semibold border ${registerMode === 'solo' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setRegisterMode('solo')}
                >
                  Solo
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold border ${registerMode === 'team' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setRegisterMode('team')}
                >
                  Team
                </button>
              </div>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  setRegisterStatus('');
                  try {
                    const payload = registerMode === 'solo'
                      ? { mode: 'solo', name: registerForm.name, email: registerForm.email }
                      : { mode: 'team', teamName: registerForm.teamName, members: registerForm.members };
                    const res = await fetch(`http://localhost:5000/api/events/${registerEventId}/register`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setRegisterStatus('Registration successful!');
                      setTimeout(() => setShowRegisterModal(false), 1200);
                    } else {
                      setRegisterStatus(data.message || 'Registration failed.');
                    }
                  } catch (err) {
                    setRegisterStatus('Registration failed.');
                  }
                  setRegisterForm({ name: '', email: '', teamName: '', members: [{ name: '', email: '' }] });
                }}
                className="space-y-4"
              >
                {registerMode === 'solo' ? (
                  <>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={registerForm.name}
                      onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={registerForm.email}
                      onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Team Name"
                      value={registerForm.teamName}
                      onChange={e => setRegisterForm(f => ({ ...f, teamName: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                    {registerForm.members.map((member, idx) => (
                      <div key={idx} className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder={`Member ${idx + 1} Name`}
                          value={member.name}
                          onChange={e => setRegisterForm(f => {
                            const members = [...f.members];
                            members[idx] = { ...members[idx], name: e.target.value };
                            return { ...f, members };
                          })}
                          className="flex-1 border rounded px-3 py-2"
                          required
                        />
                        <input
                          type="email"
                          placeholder={`Member ${idx + 1} Email`}
                          value={member.email}
                          onChange={e => setRegisterForm(f => {
                            const members = [...f.members];
                            members[idx] = { ...members[idx], email: e.target.value };
                            return { ...f, members };
                          })}
                          className="flex-1 border rounded px-3 py-2"
                          required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-green-600 underline text-sm mt-1"
                      onClick={() => setRegisterForm(f => ({ ...f, members: [...f.members, { name: '', email: '' }] }))}
                    >
                      + Add Member
                    </button>
                  </>
                )}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Submit Registration
                </button>
              </form>
              {registerStatus && <div className="text-green-600 font-semibold text-center">{registerStatus}</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

function CreateEventForm({ onCreated, ownedCommunities }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', communityId: ownedCommunities[0]?._id || '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem('token');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    let imageUrl = '';
    try {
      // If an image is selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const imgRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        if (!imgRes.ok) throw new Error('Image upload failed');
        const imgData = await imgRes.json();
        imageUrl = imgData.url;
      }
      const payload = { ...form };
      if (imageUrl) payload.imageUrl = imageUrl;
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create event');
      setSuccess('Event created!');
      setForm({ title: '', description: '', date: '', time: '', location: '', communityId: ownedCommunities[0]?._id || '' });
      setImageFile(null);
      setImagePreview(null);
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 20, borderRadius: 8, margin: 20 }}>
      <h2>Create Event</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ display: 'block', margin: 8 }} />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ display: 'block', margin: 8 }} />
      <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ display: 'block', margin: 8 }} />
      <div style={{ display: 'flex', alignItems: 'center', margin: 8 }}>
        <label htmlFor="time" style={{ marginRight: 8, fontWeight: 500 }}>Time:</label>
        <input name="time" id="time" type="time" value={form.time} onChange={handleChange} required style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #d1d5db' }} />
      </div>
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={{ display: 'block', margin: 8 }} />
      <select name="communityId" value={form.communityId} onChange={handleChange} required style={{ display: 'block', margin: 8 }}>
        {ownedCommunities.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <div style={{ margin: 8, border: '2px dashed #4ade80', background: '#f0fdf4', padding: 12, borderRadius: 8 }}>
        <h4 style={{ marginBottom: 4, color: '#166534' }}>Upload an Event Image (optional)</h4>
        <label style={{ fontWeight: 500 }}>Event Image: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <div style={{ marginTop: 8 }}>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8 }} />
          </div>
        )}
      </div>
      <button type="submit">Create</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
}

export default EventsPage;
