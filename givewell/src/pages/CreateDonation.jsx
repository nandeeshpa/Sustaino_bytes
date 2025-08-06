import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createDonation, DONATION_CATEGORIES } from '../utils/donationUtils';
import { 
  PhotoIcon,
  MapPinIcon,
  CalendarIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const CreateDonation = () => {
  const { currentUser, addPoints } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    expiryDate: '',
    imageUrl: '',
    location: {
      address: '',
      latitude: null,
      longitude: null
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    // Auto-detect user location on component mount
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding (in a real app, you'd use Google Maps API)
          // For demo, we'll use a mock address
          const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          setFormData(prev => ({
            ...prev,
            location: {
              address: mockAddress,
              latitude,
              longitude
            }
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          setLocationLoading(false);
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.quantity) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.category === 'Food' && !formData.expiryDate) {
      setError('Expiry date is required for food items');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const donation = await createDonation(formData, currentUser.uid);
      
      // Award points to the donor
      await addPoints(currentUser.uid, 10);
      
      navigate('/donations');
      alert('Donation created successfully! You earned 10 points.');
    } catch (error) {
      console.error('Error creating donation:', error);
      setError('Failed to create donation. Please try again.');
    } finally {
      setLoading(false);
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <GiftIcon className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Donation
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your unused items with those who need them
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="e.g., Fresh vegetables from my garden"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="input-field resize-none"
              placeholder="Describe the items you want to donate..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Category and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {Object.values(DONATION_CATEGORIES).map((category) => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity *
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                required
                className="input-field"
                placeholder="e.g., 5 kg, 10 pieces"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Expiry Date (for food items) */}
          {formData.category === 'Food' && (
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date *
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  required={formData.category === 'Food'}
                  className="input-field pl-10"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL (Optional)
            </label>
            <div className="relative">
              <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="input-field pl-10"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add a photo to make your donation more appealing
            </p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="address"
                name="address"
                className="input-field pl-10 pr-24"
                placeholder="Enter pickup address"
                value={formData.location.address}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={locationLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-primary-600 text-white px-2 py-1 rounded hover:bg-primary-700 disabled:opacity-50"
              >
                {locationLoading ? 'Detecting...' : 'Detect'}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This helps receivers find the pickup location
            </p>
          </div>

          {/* Image Preview */}
          {formData.imageUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Preview
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Donation preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/donations')}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Donation'}
            </button>
          </div>

          {/* Info */}
          <div className="bg-primary-50 dark:bg-primary-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-2">
              💡 Tips for a successful donation
            </h3>
            <ul className="text-xs text-primary-600 dark:text-primary-300 space-y-1">
              <li>• Add clear, high-quality photos</li>
              <li>• Provide detailed descriptions</li>
              <li>• Be accurate about quantity and condition</li>
              <li>• Respond quickly to interested receivers</li>
              <li>• You'll earn 10 points for each donation!</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;