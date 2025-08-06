import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DonationService } from '../services/donationService';
import { MockService } from '../services/mockService';
import { Donation } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  User, 
  Plus,
  Heart,
  Package,
  BookOpen,
  Shirt,
  Utensils,
  MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

const DonationFeed: React.FC = () => {
  const { userData } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories', icon: <Package className="h-4 w-4" /> },
    { value: 'Food', label: 'Food', icon: <Utensils className="h-4 w-4" /> },
    { value: 'Clothes', label: 'Clothes', icon: <Shirt className="h-4 w-4" /> },
    { value: 'Books', label: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'Others', label: 'Others', icon: <MoreHorizontal className="h-4 w-4" /> }
  ];

  useEffect(() => {
    // Initialize mock data for demo
    MockService.initializeMockData();
    loadDonations();
  }, [selectedCategory]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const filters = selectedCategory ? { category: selectedCategory, status: 'Available' } : { status: 'Available' };
      const data = await DonationService.getDonations(filters);
      setDonations(data);
    } catch (error) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food': return <Utensils className="h-5 w-5" />;
      case 'Clothes': return <Shirt className="h-5 w-5" />;
      case 'Books': return <BookOpen className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Clothes': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Books': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const isExpiringSoon = (expiryDate?: Date) => {
    if (!expiryDate) return false;
    const now = new Date();
    const diffInHours = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24 && diffInHours > 0;
  };

  const filteredDonations = donations.filter(donation =>
    donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Available Donations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Find items that need a new home
            </p>
          </div>
          <Link
            to="/create-donation"
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Donation
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search donations..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Donations Grid */}
        {filteredDonations.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No donations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filters'
                : 'Be the first to create a donation!'}
            </p>
            <Link to="/create-donation" className="btn-primary">
              Create First Donation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <div key={donation.id} className="card hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                  {donation.imageUrl ? (
                    <img
                      src={donation.imageUrl}
                      alt={donation.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getCategoryIcon(donation.category)}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Category and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(donation.category)}`}>
                      {getCategoryIcon(donation.category)}
                      <span className="ml-1">{donation.category}</span>
                    </span>
                    {donation.expiryDate && isExpiringSoon(donation.expiryDate) && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Expires soon
                      </span>
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {donation.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {donation.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Package className="h-4 w-4 mr-2" />
                      <span>Quantity: {donation.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{donation.location.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      <span>by {donation.donorName}</span>
                    </div>
                    {donation.expiryDate && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Expires: {donation.expiryDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(donation.createdAt)}
                    </span>
                    <Link
                      to={`/donation/${donation.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationFeed;