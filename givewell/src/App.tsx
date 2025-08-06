import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
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

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return userData?.isAdmin ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={currentUser ? <DonationFeed /> : <LandingPage />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/donations" element={<ProtectedRoute><DonationFeed /></ProtectedRoute>} />
        <Route path="/create-donation" element={<ProtectedRoute><CreateDonation /></ProtectedRoute>} />
        <Route path="/donation/:id" element={<ProtectedRoute><DonationDetails /></ProtectedRoute>} />
        <Route path="/chat/:donationId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/ngo-verification" element={<ProtectedRoute><NGOVerification /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><DonationHistory /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#22c55e',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
