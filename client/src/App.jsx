import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import InteractiveSpeciesPage from './pages/Species';
import SpeciesDetail from './components/SpeciesDetail';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import VirtualPet from './pages/VirtualPet';
import UploadEvidence from './pages/UploadEvidence';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import EventDetails from './pages/EventDetails';
import InteractiveEventsSection from './components/events/InteractiveEventsSection';
import './App.css';

const LandingPage = () => (
  <div className="min-h-screen">
    <Hero />
    <InteractiveEventsSection />
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container min-h-screen flex flex-col">
          <Navbar />
          <main className="main-content flex-grow pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/species" element={<InteractiveSpeciesPage />} />
              <Route path="/species/:id" element={<SpeciesDetail />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/events" element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              } />
              <Route path="/events/:id" element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="/virtual-pet" element={
                <ProtectedRoute>
                  <VirtualPet />
                </ProtectedRoute>
              } />
              <Route path="/upload-evidence" element={
                <ProtectedRoute>
                  <UploadEvidence />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <FloatingButtons />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
