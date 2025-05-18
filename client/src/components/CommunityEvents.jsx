import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CommunityEvents = ({ community, showCreateForm = false, onCloseCreateForm }) => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const userId = currentUser?.id || currentUser?._id; // Use id from token
  const token = localStorage.getItem('token');

  // Debug logs
  console.log('currentUser:', currentUser);
  console.log('userId:', userId);
  console.log('community.owner:', community.owner);

  const ownerId = typeof community.owner === 'object' && community.owner !== null ? String(community.owner._id) : String(community.owner);
  const isOwner = ownerId === String(userId);
  const memberIds = community.members ? community.members.map(m => typeof m === 'object' && m !== null ? String(m._id) : String(m)) : [];
  const isMember = isOwner || memberIds.includes(String(userId));

  // Fetch events for this community
  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/events?community=${community._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    // eslint-disable-next-line
  }, [community._id, userId]);

  // Handle image change
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

  // Handle create or update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let imageUrl = '';
    try {
      // If an image is selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const imgRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        if (!imgRes.ok) throw new Error('Image upload failed');
        const imgData = await imgRes.json();
        imageUrl = imgData.url || `/uploads/${imgData.filename}`;
      }
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent
        ? `http://localhost:5000/api/events/${editingEvent._id}`
        : 'http://localhost:5000/api/events';
      const body = editingEvent
        ? { ...form, ...(imageUrl ? { imageUrl } : {}) }
        : { ...form, communityId: community._id, ...(imageUrl ? { imageUrl } : {}) };
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save event');
      setForm({ title: '', description: '', date: '', location: '' });
      setImageFile(null);
      setImagePreview(null);
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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
        {/* Only show Create Event button for owner, unless form is open */}
        {isOwner && !showForm && !showCreateForm && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => { setShowForm(true); setEditingEvent(null); setForm({ title: '', description: '', date: '', location: '' }); }}
          >
            Create Event
          </button>
        )}
      </div>
      {(showForm || (isOwner && showCreateForm)) && isOwner && (
        <form onSubmit={async (e) => { await handleSubmit(e); if (onCloseCreateForm) onCloseCreateForm(); }} className="mb-6 flex flex-col md:flex-row gap-2 flex-wrap">
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
          <div style={{ minWidth: 220, margin: 4, border: '2px dashed #4ade80', background: '#f0fdf4', padding: 8, borderRadius: 8 }}>
            <h4 style={{ marginBottom: 4, color: '#166534', fontSize: 14 }}>Upload an Event Image (optional)</h4>
            <label style={{ fontWeight: 500, fontSize: 13 }}>Event Image: </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div style={{ marginTop: 8 }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }} />
              </div>
            )}
          </div>
          <button type="submit" className="px-4 py-1 bg-green-600 text-white rounded">
            {editingEvent ? 'Update' : 'Create'}
          </button>
          <button type="button" className="px-4 py-1 bg-gray-300 rounded" onClick={() => { setShowForm(false); setEditingEvent(null); if (onCloseCreateForm) onCloseCreateForm(); }}>
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
                  <p className="text-xs text-green-700 font-semibold">Community: {community.name}</p>
                </div>
                {/* Only owner can edit/delete */}
                {isOwner && event.createdBy === userId && (
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