import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Stats from './components/Stats';
import Testimonial from './components/Testimonial';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import SpeciesPage from './pages/Species';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import VirtualPet from './pages/VirtualPet';
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
      <div className="app-container min-h-screen flex flex-col">
        <Navbar />
        <main className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/species" element={<SpeciesPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/virtual-pet" element={<VirtualPet />} />
          </Routes>
        </main>
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
