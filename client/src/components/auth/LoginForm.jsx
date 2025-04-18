import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Login request data:', formData);
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login response:', res.data);
      alert(` Logged in as ${res.data.user.name}`);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(' Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
