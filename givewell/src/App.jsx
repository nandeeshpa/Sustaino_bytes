import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonationFeed from './pages/DonationFeed';
import CreateDonation from './pages/CreateDonation';
import DonationDetails from './pages/DonationDetails';
import ChatPage from './pages/ChatPage';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import NGOVerification from './pages/NGOVerification';
import MapView from './pages/MapView';
import DonationHistory from './pages/DonationHistory';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/donations" element={
                <ProtectedRoute>
                  <DonationFeed />
                </ProtectedRoute>
              } />
              <Route path="/create-donation" element={
                <ProtectedRoute>
                  <CreateDonation />
                </ProtectedRoute>
              } />
              <Route path="/donation/:id" element={
                <ProtectedRoute>
                  <DonationDetails />
                </ProtectedRoute>
              } />
              <Route path="/chat/:donationId" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />
              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/ngo-verification" element={
                <ProtectedRoute>
                  <NGOVerification />
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <MapView />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <DonationHistory />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
