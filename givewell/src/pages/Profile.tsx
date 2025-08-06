import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Award } from 'lucide-react';

const Profile: React.FC = () => {
  const { userData } = useAuth();

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="h-24 w-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {userData?.fullName || 'User Profile'}
            </h1>
            <div className="flex items-center justify-center mt-2">
              <span className="text-primary-600 font-medium mr-2">
                {userData?.points || 0} points
              </span>
              {userData?.badge !== 'None' && (
                <span className="text-2xl">
                  {getBadgeIcon(userData?.badge || 'None')}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {userData?.email || 'Not provided'}
                </div>
              </div>
            </div>

            {userData?.phoneNumber && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {userData.phoneNumber}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Badge</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {userData?.badge || 'None'} {getBadgeIcon(userData?.badge || 'None')}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Profile editing and additional features coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;