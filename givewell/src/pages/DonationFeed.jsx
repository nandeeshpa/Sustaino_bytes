import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  getAvailableDonations, 
  DONATION_CATEGORIES,
  acceptDonation 
} from '../utils/donationUtils';
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  HeartIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const DonationFeed = () => {
  const { currentUser, addPoints } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, selectedCategory]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const fetchedDonations = await getAvailableDonations();
      setDonations(fetchedDonations);
    } catch (error) {
      console.error('Error loading donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(donation => donation.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDonations(filtered);
  };

  const handleAcceptDonation = async (donationId) => {
    try {
      await acceptDonation(donationId, currentUser.uid);
      // Remove from local state
      setDonations(prev => prev.filter(d => d.firestoreId !== donationId));
      alert('Donation accepted! You can now chat with the donor.');
    } catch (error) {
      console.error('Error accepting donation:', error);
      alert('Failed to accept donation. Please try again.');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food':
        return '🍽️';
      case 'Clothes':
        return '👕';
      case 'Books':
        return '📚';
      default:
        return '📦';
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return format(date, 'MMM dd, yyyy');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Available Donations
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find items that can help you or your community
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/create-donation"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <GiftIcon className="h-5 w-5" />
            <span>Donate Items</span>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search donations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Category Filter */}
        {showFilters && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {Object.values(DONATION_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {getCategoryIcon(category)} {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Donations Grid */}
      {filteredDonations.length === 0 ? (
        <div className="text-center py-12">
          <GiftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No donations found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Be the first to create a donation!'
            }
          </p>
          <Link to="/create-donation" className="btn-primary">
            Create Donation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div key={donation.firestoreId} className="card overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              {donation.imageUrl ? (
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                  <span className="text-6xl">
                    {getCategoryIcon(donation.category)}
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {getCategoryIcon(donation.category)} {donation.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getTimeAgo(donation.createdAt)}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {donation.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {donation.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>Quantity: {donation.quantity}</span>
                  </div>
                  
                  {donation.location?.address && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span className="truncate">{donation.location.address}</span>
                    </div>
                  )}

                  {donation.expiryDate && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>Expires: {format(new Date(donation.expiryDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/donation/${donation.firestoreId}`}
                    className="flex-1 text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
                  >
                    View Details
                  </Link>
                  
                  {donation.donorId !== currentUser?.uid && (
                    <button
                      onClick={() => handleAcceptDonation(donation.firestoreId)}
                      className="flex-1 btn-primary"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredDonations.length >= 12 && (
        <div className="text-center mt-8">
          <button className="btn-outline">
            Load More Donations
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationFeed;