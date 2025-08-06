export interface User {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  profilePicture?: string;
  points: number;
  badge: 'None' | 'Bronze' | 'Silver' | 'Gold';
  isNGO: boolean;
  isAdmin: boolean;
  isVerifiedNGO: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  category: 'Food' | 'Clothes' | 'Books' | 'Others';
  title: string;
  description: string;
  quantity: string;
  expiryDate?: Date;
  imageUrl?: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: 'Available' | 'Accepted' | 'Delivered' | 'Cancelled';
  acceptedBy?: string;
  acceptedByName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  donationId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system';
}

export interface NGOApplication {
  id: string;
  userId: string;
  userName: string;
  registrationNumber: string;
  address: string;
  proofDocument: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'donation_accepted' | 'donation_rejected' | 'donation_delivered' | 'ngo_approved' | 'ngo_rejected';
  read: boolean;
  createdAt: Date;
  relatedId?: string; // donation ID or application ID
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface MockNGO {
  id: string;
  name: string;
  address: string;
  location: Location;
  verified: boolean;
  contactPhone: string;
  description: string;
}