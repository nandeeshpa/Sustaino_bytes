import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seedAllData } from '../utils/seedData';
import { 
  HeartIcon, 
  GiftIcon, 
  UserGroupIcon, 
  MapPinIcon,
  TrophyIcon,
  CheckBadgeIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const { currentUser } = useAuth();

  const handleSeedData = async () => {
    try {
      await seedAllData();
      alert('Demo data seeded successfully! You can now explore the app with sample donations and users.');
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Failed to seed demo data. Please check the console for errors.');
    }
  };

  const features = [
    {
      icon: <GiftIcon className="h-8 w-8" />,
      title: 'Easy Donations',
      description: 'Share your unused items with those who need them most. Food, clothes, books, and more.'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Community Driven',
      description: 'Connect directly with donors and receivers in your community. No middleman, just direct help.'
    },
    {
      icon: <MapPinIcon className="h-8 w-8" />,
      title: 'Location Based',
      description: 'Find donations near you or connect with verified NGOs in your area.'
    },
    {
      icon: <TrophyIcon className="h-8 w-8" />,
      title: 'Gamified Experience',
      description: 'Earn points, badges, and recognition for your contributions to the community.'
    }
  ];

  const stats = [
    { number: '1,000+', label: 'Items Donated' },
    { number: '500+', label: 'Happy Recipients' },
    { number: '50+', label: 'Verified NGOs' },
    { number: '25+', label: 'Cities Covered' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                <HeartIcon className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              GiveWell
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-4">
              Donate with Dignity
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              A social platform where anyone can donate or receive usable items to reduce waste 
              and help the underprivileged. Join our community of givers and receivers today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser ? (
                <>
                  <Link to="/donations" className="btn-primary text-lg px-8 py-3">
                    Browse Donations
                  </Link>
                  <Link to="/create-donation" className="btn-outline text-lg px-8 py-3">
                    Start Donating
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-3">
                    Join the Community
                  </Link>
                  <Link to="/login" className="btn-outline text-lg px-8 py-3">
                    Already a Member?
                  </Link>
                </>
              )}
            </div>

            {/* Demo Data Button */}
            <div className="mt-6">
              <button
                onClick={handleSeedData}
                className="inline-flex items-center space-x-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <BeakerIcon className="h-4 w-4" />
                <span>Seed Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose GiveWell?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make it easy for you to make a difference in your community while reducing waste.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="flex justify-center mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Getting started is simple and takes just a few minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Sign Up
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create your account with just an email and password. No role selection needed!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Donate or Receive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Post items you want to donate or browse available donations in your area.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Connect & Give
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat with donors/receivers, arrange pickup, and earn points for your contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of community members who are already making an impact.
          </p>
          
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Get Started Now
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <HeartIcon className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">GiveWell</span>
            </div>
            <p className="text-gray-400 mb-4">
              Donate with Dignity • Reduce Waste • Help Community
            </p>
            <p className="text-sm text-gray-500">
              Built by Team Sustaino Bytes • © 2024 GiveWell Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;