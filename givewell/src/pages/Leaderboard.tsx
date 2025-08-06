import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const topDonors = [
    { rank: 1, name: 'Sarah Johnson', points: 150, badge: 'Gold', donations: 15, icon: '🥇' },
    { rank: 2, name: 'Michael Chen', points: 120, badge: 'Gold', donations: 12, icon: '🥈' },
    { rank: 3, name: 'Emily Davis', points: 95, badge: 'Silver', donations: 9, icon: '🥉' },
    { rank: 4, name: 'John Smith', points: 80, badge: 'Silver', donations: 8, icon: '🏅' },
    { rank: 5, name: 'Lisa Wong', points: 65, badge: 'Silver', donations: 6, icon: '🏅' },
    { rank: 6, name: 'David Brown', points: 50, badge: 'Bronze', donations: 5, icon: '🏅' },
    { rank: 7, name: 'Anna Taylor', points: 45, badge: 'Bronze', donations: 4, icon: '🏅' },
    { rank: 8, name: 'Tom Wilson', points: 35, badge: 'Bronze', donations: 3, icon: '🏅' },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      case 'Bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-600 mr-2" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Celebrating our most generous community members
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {topDonors.slice(0, 3).map((donor, index) => (
            <div 
              key={donor.rank} 
              className={`card p-6 text-center ${
                index === 0 ? 'md:order-2 transform md:scale-110' : 
                index === 1 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className="text-6xl mb-4">{donor.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                #{donor.rank}
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {donor.name}
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {donor.points} pts
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${getBadgeColor(donor.badge)}`}>
                {donor.badge}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {donor.donations} donations
              </div>
            </div>
          ))}
        </div>

        {/* Rest of the leaderboard */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Contributors
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {topDonors.map((donor) => (
              <div key={donor.rank} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-500 dark:text-gray-400 w-8">
                    #{donor.rank}
                  </div>
                  <div className="text-2xl">{donor.icon}</div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {donor.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {donor.donations} donations made
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(donor.badge)}`}>
                    {donor.badge}
                  </div>
                  <div className="text-xl font-bold text-primary-600">
                    {donor.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Information */}
        <div className="mt-12 card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Badge System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🥉</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Bronze</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">10+ points</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🥈</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Silver</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">25+ points</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🥇</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Gold</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">50+ points</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Earn 10 points for each successful donation. Keep giving to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;