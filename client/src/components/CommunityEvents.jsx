import React, { useEffect, useState } from 'react';

// Simulate current user (replace with your auth logic)
const USER_ID = "000000000000000000000001";

const CommunityEvents = ({ community }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const isOwner = community.owner === USER_ID;
  const isMember = community.members.includes(USER_ID);

  // Fetch events for this community
  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/events?community=${community._id}&user=${USER_ID}`);
      if (!res.ok) throw new Error('Not authorized or failed to fetch events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isMember) fetchEvents();
  }, [community._id]);

  // Handle create or update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent._id}`
        : 'http://localhost:5000/api/events';
      const body = editingEvent
        ? { ...form, userId: USER_ID }
        : { ...form, communityId: community._id, createdBy: USER_ID };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save event');
      setForm({ title: '', description: '', date: '', location: '' });
      setShowForm(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: USER_ID }),
      });
      if (!res.ok) throw new Error('Failed to delete event');
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Start editing an event
  const startEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10) || '',
      location: event.location,
    });
    setShowForm(true);
  };

  if (!isMember) {
    return <div className="text-red-500">Join this community to view events.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-green-700">Events</h2>
        {isOwner && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => { setShowForm(true); setEditingEvent(null); setForm({ title: '', description: '', date: '', location: '' }); }}
          >
            Create Event
          </button>
        )}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="px-2 py-1 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="px-2 py-1 border rounded"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="px-2 py-1 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="px-2 py-1 border rounded"
            required
          />
          <button type="submit" className="px-4 py-1 bg-green-600 text-white rounded">
            {editingEvent ? 'Update' : 'Create'}
          </button>
          <button type="button" className="px-4 py-1 bg-gray-300 rounded" onClick={() => { setShowForm(false); setEditingEvent(null); }}>
            Cancel
          </button>
        </form>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <div>
          {events.length === 0 ? (
            <div className="text-gray-500">No events yet.</div>
          ) : (
            events.map(event => (
              <div key={event._id} className="py-4 border-b last:border-b-0 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-xs text-gray-400">{event.date?.slice(0, 10)} | {event.location}</p>
                </div>
                {event.createdBy === USER_ID && (
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => startEdit(event)}>Edit</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityEvents; 