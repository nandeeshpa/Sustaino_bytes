import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DonationService } from '../services/donationService';
import { 
  MapPin, 
  Camera, 
  Calendar,
  Package,
  Type,
  FileText,
  Hash,
  Utensils,
  Shirt,
  BookOpen,
  MoreHorizontal,
  Loader,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreateDonation: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    imageUrl: '',
    location: {
      address: '',
      lat: 0,
      lng: 0
    }
  });

  const categories = [
    { value: 'Food', label: 'Food', icon: <Utensils className="h-5 w-5" />, description: 'Meals, groceries, packaged food' },
    { value: 'Clothes', label: 'Clothes', icon: <Shirt className="h-5 w-5" />, description: 'Clothing, shoes, accessories' },
    { value: 'Books', label: 'Books', icon: <BookOpen className="h-5 w-5" />, description: 'Books, magazines, educational material' },
    { value: 'Others', label: 'Others', icon: <MoreHorizontal className="h-5 w-5" />, description: 'Electronics, furniture, toys, etc.' }
  ];

  useEffect(() => {
    // Auto-detect location on component mount
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // In a real app, you would use a geocoding service like Google Maps API
          // For demo purposes, we'll use a mock address
          const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Demo Location)`;
          
          setFormData(prev => ({
            ...prev,
            location: {
              address: mockAddress,
              lat: latitude,
              lng: longitude
            }
          }));
          
          toast.success('Location detected successfully');
        } catch (error) {
          toast.error('Failed to get address from coordinates');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        toast.error('Failed to detect location. Please enter manually.');
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      toast.error('You must be logged in to create a donation');
      return;
    }

    if (!formData.location.address) {
      toast.error('Please provide a pickup location');
      return;
    }

    setLoading(true);

    try {
      const donation = {
        donorId: userData.uid,
        donorName: userData.fullName,
        category: formData.category as 'Food' | 'Clothes' | 'Books' | 'Others',
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
        imageUrl: formData.imageUrl || undefined,
        location: formData.location,
        status: 'Available' as const
      };

      await DonationService.createDonation(donation);
      toast.success('Donation created successfully!');
      navigate('/donations');
    } catch (error) {
      toast.error('Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Firebase Storage or another service
      // For demo purposes, we'll create a mock URL
      const mockUrl = `https://via.placeholder.com/400x300?text=${encodeURIComponent(file.name)}`;
      setFormData(prev => ({
        ...prev,
        imageUrl: mockUrl
      }));
      toast.success('Image uploaded successfully (demo)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Donation
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Share your items with those who need them
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        formData.category === category.value
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${formData.category === category.value ? 'text-primary-600' : 'text-gray-400'}`}>
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {category.label}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="input-field pl-10"
                    placeholder="e.g., Fresh vegetables, Winter clothes, Programming books"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="input-field pl-10 resize-none"
                    placeholder="Describe the items, their condition, and any special instructions..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    required
                    className="input-field pl-10"
                    placeholder="e.g., 5 kg, 3 bags, 10 books"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Expiry Date (for food items) */}
              {formData.category === 'Food' && (
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      className="input-field pl-10"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    {formData.imageUrl ? (
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Image uploaded</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pickup Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {locationLoading ? (
                      <Loader className="h-5 w-5 text-gray-400 animate-spin" />
                    ) : (
                      <MapPin className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="input-field pl-10 pr-24"
                    placeholder="Enter pickup address"
                    value={formData.location.address}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locationLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
                  >
                    {locationLoading ? 'Detecting...' : 'Auto-detect'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || !formData.category}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                      Creating Donation...
                    </div>
                  ) : (
                    'Create Donation'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonation;