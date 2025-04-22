import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import FileUpload from '../components/upload/FileUpload';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:5000/api/events');
    setEvents(await res.json());
  };

  useEffect(() => { fetchEvents(); }, []);

  const updateEvent = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/events/${editedEvent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedEvent),
    });
    setEditedEvent(null);
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
    fetchEvents();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

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
        {events.map(event => (
          <div key={event.id} className="mb-4 border-b pb-2">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date} - {event.time}</p>
            <p>{event.location}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setEditedEvent(event)}>Update</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editedEvent && (
        <form onSubmit={updateEvent} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-8 space-y-4">
          {['title', 'description', 'date', 'time', 'location'].map((field) => (
            <div key={field}>
              <label className="block font-semibold capitalize">{field}</label>
              <input
                type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                name={field}
                value={editedEvent[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Home;
