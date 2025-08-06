import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  TrophyIcon, 
  StarIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  TrophyIcon as TrophyIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';

const Leaderboard = () => {
  const { userProfile } = useAuth();
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      
      // Get all users ordered by points
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('points', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(usersQuery);
      const users = [];
      
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setTopDonors(users);
      
      // Find current user's rank
      if (userProfile) {
        const currentUserRank = users.findIndex(user => user.uid === userProfile.uid) + 1;
        setUserRank(currentUserRank || null);
      }
      
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
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

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <TrophyIconSolid className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <TrophyIconSolid className="h-6 w-6 text-gray-400" />;
      case 3:
        return <TrophyIconSolid className="h-6 w-6 text-orange-600" />;
      default:
        return <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-gray-600 dark:text-gray-300">#{rank}</span>;
    }
  };

  if (loading) {
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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <TrophyIcon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Leaderboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Celebrating our top contributors who make a difference
        </p>
      </div>

      {/* User's Current Rank */}
      {userProfile && userRank && (
        <div className="card p-4 mb-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 border-primary-200 dark:border-primary-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getRankIcon(userRank)}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Your Rank: #{userRank}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-300">Points</div>
                <div className="font-bold text-primary-600">{userProfile.points}</div>
              </div>
              {userProfile.badge !== 'None' && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(userProfile.badge)}`}>
                  {getBadgeEmoji(userProfile.badge)} {userProfile.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      {topDonors.length >= 3 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            🏆 Top Contributors
          </h2>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* Second Place */}
            <div className="text-center">
              <div className="card p-4 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="flex justify-center mb-2">
                  <TrophyIconSolid className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">#2</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {topDonors[1]?.fullName || 'Anonymous'}
                </div>
                <div className="text-lg font-bold text-gray-600 mb-1">{topDonors[1]?.points || 0}</div>
                {topDonors[1]?.badge !== 'None' && (
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${getBadgeColor(topDonors[1]?.badge)}`}>
                    {getBadgeEmoji(topDonors[1]?.badge)}
                  </span>
                )}
              </div>
            </div>

            {/* First Place */}
            <div className="text-center">
              <div className="card p-4 bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900 transform scale-105">
                <div className="flex justify-center mb-2">
                  <TrophyIconSolid className="h-10 w-10 text-yellow-500" />
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">#1</div>
                <div className="font-bold text-gray-900 dark:text-white mb-1">
                  {topDonors[0]?.fullName || 'Anonymous'}
                </div>
                <div className="text-xl font-bold text-yellow-600 mb-1">{topDonors[0]?.points || 0}</div>
                {topDonors[0]?.badge !== 'None' && (
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${getBadgeColor(topDonors[0]?.badge)}`}>
                    {getBadgeEmoji(topDonors[0]?.badge)}
                  </span>
                )}
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <div className="card p-4 bg-gradient-to-b from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-900">
                <div className="flex justify-center mb-2">
                  <TrophyIconSolid className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">#3</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {topDonors[2]?.fullName || 'Anonymous'}
                </div>
                <div className="text-lg font-bold text-orange-600 mb-1">{topDonors[2]?.points || 0}</div>
                {topDonors[2]?.badge !== 'None' && (
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${getBadgeColor(topDonors[2]?.badge)}`}>
                    {getBadgeEmoji(topDonors[2]?.badge)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Contributors
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {topDonors.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <HeartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No contributors yet. Be the first to make a donation!
              </p>
            </div>
          ) : (
            topDonors.map((user, index) => (
              <div 
                key={user.id} 
                className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  user.uid === userProfile?.uid ? 'bg-primary-50 dark:bg-primary-900' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-800 dark:to-secondary-800 rounded-full flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.fullName || 'Anonymous'}
                        {user.uid === userProfile?.uid && (
                          <span className="ml-2 text-xs text-primary-600 dark:text-primary-400">(You)</span>
                        )}
                        {user.isVerifiedNGO && (
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400">✅ Verified NGO</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.points} points • Joined {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {user.badge !== 'None' && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(user.badge)}`}>
                      {getBadgeEmoji(user.badge)} {user.badge}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Badge Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">🥉</div>
          <div className="font-semibold text-gray-900 dark:text-white">Bronze Badge</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">10+ points</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">🥈</div>
          <div className="font-semibold text-gray-900 dark:text-white">Silver Badge</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">25+ points</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl mb-2">🥇</div>
          <div className="font-semibold text-gray-900 dark:text-white">Gold Badge</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">50+ points</div>
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="mt-6 card p-4 bg-primary-50 dark:bg-primary-900">
        <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
          How to Earn Points
        </h3>
        <ul className="text-sm text-primary-600 dark:text-primary-300 space-y-1">
          <li>• Create a donation: +10 points</li>
          <li>• Complete a successful donation: +5 points</li>
          <li>• Receive positive feedback: +3 points</li>
          <li>• Help verify NGOs: +15 points</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;