import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Stats from './components/Stats';
import Testimonial from './components/Testimonial';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import SpeciesPage from './pages/SpeciesPage';
import './App.css';

const LandingPage = () => (
  <div className="min-h-screen">
    <Hero />
    <Events />
    <Stats />
    <Testimonial />
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/species" element={<SpeciesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
