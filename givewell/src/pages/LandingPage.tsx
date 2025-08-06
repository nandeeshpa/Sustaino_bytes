import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  MapPin, 
  Trophy, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Donate with Purpose",
      description: "Share food, clothes, books, and more with those who need them most."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Connect directly with donors and receivers in your local community."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Location Based",
      description: "Find donations and NGOs near you with our smart location features."
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Earn Recognition",
      description: "Gain points and badges for your generous contributions to society."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified NGOs",
      description: "Partner with verified NGOs for maximum impact and transparency."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Real-time Chat",
      description: "Communicate instantly with donors and receivers through our chat system."
    }
  ];

  const stats = [
    { number: "10K+", label: "Donations Made" },
    { number: "5K+", label: "Active Users" },
    { number: "200+", label: "Verified NGOs" },
    { number: "50+", label: "Cities Covered" }
  ];

  const topDonors = [
    { name: "Sarah Johnson", points: 150, badge: "🥇" },
    { name: "Michael Chen", points: 120, badge: "🥈" },
    { name: "Emily Davis", points: 95, badge: "🥉" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary-600">Give</span>Well –{' '}
              <span className="text-secondary-600">Donate</span> with{' '}
              <span className="text-primary-600">Dignity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              A social platform where anyone can donate or receive usable items to reduce waste and help the underprivileged.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="btn-outline text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How GiveWell Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, secure, and meaningful ways to give and receive in your community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Donors Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Top Contributors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Celebrating our most generous community members
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {topDonors.map((donor, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-4xl mb-4">{donor.badge}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {donor.name}
                </h3>
                <p className="text-primary-600 font-medium">
                  {donor.points} points
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
              Simple 3-Step Process
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Register & Verify
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create your account and verify your email to get started
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Donate or Request
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Post items you want to donate or browse available donations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connect & Share
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat with donors/receivers and arrange pickup or delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose GiveWell?
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce waste by giving items a second life",
                  "Help underprivileged communities in your area",
                  "Earn recognition through our gamification system",
                  "Connect with verified NGOs for maximum impact",
                  "Real-time communication with donors and receivers",
                  "Location-based matching for convenient exchanges"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center text-white">
                    <CheckCircle className="h-6 w-6 text-primary-200 mr-3 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of users who are already making their communities better.
                </p>
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center w-full"
                >
                  Join GiveWell Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold">GiveWell</span>
            </div>
            <p className="text-gray-400 mb-4">
              Donate with Dignity – Reducing waste, helping communities
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 GiveWell. Made with ❤️ for a better world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;