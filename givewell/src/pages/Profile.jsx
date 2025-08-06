import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserDonations } from '../utils/donationUtils';
import { 
  UserCircleIcon, 
  PencilIcon,
  TrophyIcon,
  GiftIcon,
  HeartIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Profile = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [donations, setDonations] = useState({ donated: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (userProfile) {
      setEditData({
        fullName: userProfile.fullName || '',
        phoneNumber: userProfile.phoneNumber || ''
      });
      loadUserDonations();
    }
  }, [userProfile]);

  const loadUserDonations = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const userDonations = await getUserDonations(currentUser.uid);
      setDonations(userDonations);
    } catch (error) {
      console.error('Error loading user donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(currentUser.uid, editData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const getBadgeEmoji = (badge) => {
    switch (badge) {
      case 'Gold': return '🥇';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '';
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
      case 'Bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'Accepted': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'Delivered': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-800 dark:to-secondary-800 rounded-full flex items-center justify-center">
              <UserCircleIcon className="h-16 w-16 text-primary-600" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            {editing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="input-field text-lg font-semibold"
                  placeholder="Full Name"
                />
                <input
                  type="tel"
                  value={editData.phoneNumber}
                  onChange={(e) => setEditData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="input-field"
                  placeholder="Phone Number"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveProfile} className="btn-primary">
                    Save
                  </button>
                  <button onClick={() => setEditing(false)} className="btn-outline">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userProfile.fullName}
                  </h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                    <EnvelopeIcon className="h-4 w-4" />
                    <span className="text-sm">{userProfile.email}</span>
                  </div>
                  
                  {userProfile.phoneNumber && (
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                      <PhoneIcon className="h-4 w-4" />
                      <span className="text-sm">{userProfile.phoneNumber}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {format(new Date(userProfile.createdAt), 'MMMM yyyy')}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{userProfile.points}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Points</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{donations.donated.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Donated</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{donations.received.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Received</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          {userProfile.badge !== 'None' && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(userProfile.badge)}`}>
              {getBadgeEmoji(userProfile.badge)} {userProfile.badge} Badge
            </span>
          )}
          
          {userProfile.isVerifiedNGO && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200">
              ✅ Verified NGO
            </span>
          )}
          
          {userProfile.isAdmin && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200">
              👑 Admin
            </span>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/create-donation" className="card p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <GiftIcon className="h-8 w-8 text-primary-600" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Create Donation</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Share items with community</div>
            </div>
          </div>
        </Link>

        <Link to="/donations" className="card p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <HeartIcon className="h-8 w-8 text-secondary-600" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Browse Donations</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Find items you need</div>
            </div>
          </div>
        </Link>

        <Link to="/leaderboard" className="card p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Leaderboard</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">See top contributors</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Donation History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donations Made */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Donations Made ({donations.donated.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="px-6 py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : donations.donated.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <GiftIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No donations made yet</p>
                <Link to="/create-donation" className="btn-primary mt-4">
                  Create Your First Donation
                </Link>
              </div>
            ) : (
              donations.donated.map((donation) => (
                <div key={donation.firestoreId} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {donation.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {donation.category} • {donation.quantity}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(donation.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Donations Received */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Donations Received ({donations.received.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="px-6 py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : donations.received.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <HeartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No donations received yet</p>
                <Link to="/donations" className="btn-primary mt-4">
                  Browse Available Donations
                </Link>
              </div>
            ) : (
              donations.received.map((donation) => (
                <div key={donation.firestoreId} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {donation.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {donation.category} • {donation.quantity}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Accepted {format(new Date(donation.acceptedAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;