import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DonationService } from '../services/donationService';
import { Donation } from '../types';
import QRCode from 'qrcode.react';
import { 
  MapPin, 
  Clock, 
  User, 
  Package,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  Heart,
  Share2,
  ArrowLeft,
  QrCode
} from 'lucide-react';
import toast from 'react-hot-toast';

const DonationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (id) {
      loadDonation();
    }
  }, [id]);

  const loadDonation = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await DonationService.getDonationById(id);
      if (data) {
        setDonation(data);
      } else {
        toast.error('Donation not found');
        navigate('/donations');
      }
    } catch (error) {
      toast.error('Failed to load donation');
      navigate('/donations');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!donation || !userData) return;
    
    if (userData.uid === donation.donorId) {
      toast.error('You cannot accept your own donation');
      return;
    }

    setAccepting(true);
    try {
      await DonationService.acceptDonation(donation.id, userData.uid, userData.fullName);
      toast.success('Donation accepted! You can now chat with the donor.');
      
      // Refresh donation data
      await loadDonation();
      
      // Navigate to chat
      navigate(`/chat/${donation.id}`);
    } catch (error) {
      toast.error('Failed to accept donation');
    } finally {
      setAccepting(false);
    }
  };

  const handleCall = () => {
    toast.success('Call functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: donation?.title,
        text: donation?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food': return '🍽️';
      case 'Clothes': return '👕';
      case 'Books': return '📚';
      default: return '📦';
    }
  };

  const isExpiringSoon = (expiryDate?: Date) => {
    if (!expiryDate) return false;
    const now = new Date();
    const diffInHours = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24 && diffInHours > 0;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Donation not found
          </h2>
          <Link to="/donations" className="btn-primary">
            Back to Donations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/donations')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Donations
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQR(!showQR)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image and Basic Info */}
            <div className="card">
              {donation.imageUrl && (
                <div className="h-64 sm:h-80 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                  <img
                    src={donation.imageUrl}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{getCategoryIcon(donation.category)}</span>
                  {donation.expiryDate && isExpiringSoon(donation.expiryDate) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <Clock className="h-4 w-4 mr-1" />
                      Expires soon
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {donation.title}
                </h1>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <span className="text-sm">
                    Posted {formatTimeAgo(donation.createdAt)} • {donation.category}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {donation.description}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Quantity</div>
                    <div className="font-medium text-gray-900 dark:text-white">{donation.quantity}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">{donation.location.address}</div>
                  </div>
                </div>

                {donation.expiryDate && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Expires</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {donation.expiryDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Donor</div>
                    <div className="font-medium text-gray-900 dark:text-white">{donation.donorName}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            {showQR && (
              <div className="card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  QR Code
                </h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCode 
                    value={window.location.href} 
                    size={150}
                    level="M"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Scan to share this donation
                </p>
              </div>
            )}

            {/* Action Panel */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Actions
              </h3>

              {donation.status === 'Available' && userData?.uid !== donation.donorId && (
                <div className="space-y-3">
                  <button
                    onClick={handleAccept}
                    disabled={accepting}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
                  >
                    {accepting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    {accepting ? 'Accepting...' : 'Accept Donation'}
                  </button>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    By accepting, you'll be able to chat with the donor to arrange pickup.
                  </p>
                </div>
              )}

              {donation.status === 'Accepted' && (
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        {userData?.uid === donation.acceptedBy 
                          ? 'You accepted this donation' 
                          : `Accepted by ${donation.acceptedByName}`
                        }
                      </span>
                    </div>
                  </div>

                  {(userData?.uid === donation.donorId || userData?.uid === donation.acceptedBy) && (
                    <div className="space-y-2">
                      <Link
                        to={`/chat/${donation.id}`}
                        className="w-full btn-primary flex items-center justify-center"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Chat
                      </Link>
                      
                      <button
                        onClick={handleCall}
                        className="w-full btn-outline flex items-center justify-center"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call {userData?.uid === donation.donorId ? 'Receiver' : 'Donor'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {userData?.uid === donation.donorId && donation.status === 'Available' && (
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 dark:text-blue-200 font-medium">
                      This is your donation
                    </span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Waiting for someone to accept it.
                  </p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Status
              </h3>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                donation.status === 'Available' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : donation.status === 'Accepted'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {donation.status}
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Created: {donation.createdAt.toLocaleDateString()}</p>
                <p>Updated: {donation.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;