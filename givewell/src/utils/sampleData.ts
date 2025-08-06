import { User, Donation } from '../types';

export const sampleUsers: Omit<User, 'uid'>[] = [
  {
    email: 'admin@givewell.com',
    fullName: 'Admin User',
    phoneNumber: '+1234567890',
    points: 200,
    badge: 'Gold',
    isNGO: false,
    isAdmin: true,
    isVerifiedNGO: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    email: 'sarah@example.com',
    fullName: 'Sarah Johnson',
    phoneNumber: '+1234567891',
    points: 150,
    badge: 'Gold',
    isNGO: false,
    isAdmin: false,
    isVerifiedNGO: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    email: 'michael@example.com',
    fullName: 'Michael Chen',
    phoneNumber: '+1234567892',
    points: 120,
    badge: 'Gold',
    isNGO: false,
    isAdmin: false,
    isVerifiedNGO: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    email: 'ngo@hopeFoundation.org',
    fullName: 'Hope Foundation',
    phoneNumber: '+1234567893',
    points: 50,
    badge: 'Bronze',
    isNGO: true,
    isAdmin: false,
    isVerifiedNGO: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const sampleDonations: Omit<Donation, 'id'>[] = [
  {
    donorId: 'user1',
    donorName: 'Sarah Johnson',
    category: 'Food',
    title: 'Fresh Vegetables and Fruits',
    description: 'Organic vegetables and fresh fruits from my garden. Perfect for families in need. Includes tomatoes, carrots, apples, and bananas.',
    quantity: '5 kg mixed',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    location: {
      address: '123 Garden Street, Chennai, Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707
    },
    status: 'Available',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    donorId: 'user2',
    donorName: 'Michael Chen',
    category: 'Clothes',
    title: 'Winter Clothing Collection',
    description: 'Gently used winter clothes including jackets, sweaters, and warm pants. Sizes range from M to XL. All items are clean and in good condition.',
    quantity: '3 bags',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    location: {
      address: '456 Warm Lane, Chennai, Tamil Nadu',
      lat: 13.0878,
      lng: 80.2785
    },
    status: 'Available',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    donorId: 'user1',
    donorName: 'Sarah Johnson',
    category: 'Books',
    title: 'Educational Books for Children',
    description: 'Collection of children\'s educational books, story books, and textbooks. Great for ages 5-15. Includes math, science, and English books.',
    quantity: '20 books',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    location: {
      address: '123 Garden Street, Chennai, Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707
    },
    status: 'Available',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    donorId: 'user3',
    donorName: 'Emily Davis',
    category: 'Others',
    title: 'Electronic Items - Working Condition',
    description: 'Old but working electronic items including a radio, table fan, and some kitchen appliances. All tested and in working condition.',
    quantity: '5 items',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
    location: {
      address: '789 Tech Avenue, Chennai, Tamil Nadu',
      lat: 13.0458,
      lng: 80.2436
    },
    status: 'Accepted',
    acceptedBy: 'ngo1',
    acceptedByName: 'Hope Foundation',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    donorId: 'user2',
    donorName: 'Michael Chen',
    category: 'Food',
    title: 'Packaged Food Items',
    description: 'Non-perishable packaged food items including rice, dal, oil, and spices. All items are within expiry date and properly sealed.',
    quantity: '10 kg assorted',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400',
    location: {
      address: '456 Warm Lane, Chennai, Tamil Nadu',
      lat: 13.0878,
      lng: 80.2785
    },
    status: 'Available',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

// Demo credentials for easy testing
export const demoCredentials = {
  admin: {
    email: 'admin@givewell.com',
    password: 'admin123'
  },
  user: {
    email: 'user@givewell.com',
    password: 'user123'
  },
  ngo: {
    email: 'ngo@givewell.com',
    password: 'ngo123'
  }
};

// Mock data for locations and NGOs
export const mockNGOs = [
  {
    id: 'ngo1',
    name: 'Hope Foundation',
    address: '123 Hope Street, Chennai, Tamil Nadu',
    location: {
      lat: 13.0827,
      lng: 80.2707,
      address: '123 Hope Street, Chennai, Tamil Nadu'
    },
    verified: true,
    contactPhone: '+91-9876543210',
    description: 'Helping underprivileged children and families with education and basic needs.'
  },
  {
    id: 'ngo2',
    name: 'Care Society',
    address: '456 Care Avenue, Chennai, Tamil Nadu',
    location: {
      lat: 13.0458,
      lng: 80.2436,
      address: '456 Care Avenue, Chennai, Tamil Nadu'
    },
    verified: true,
    contactPhone: '+91-9876543211',
    description: 'Focused on elderly care and healthcare services for the community.'
  },
  {
    id: 'ngo3',
    name: 'Green Earth Initiative',
    address: '789 Green Road, Chennai, Tamil Nadu',
    location: {
      lat: 13.1067,
      lng: 80.2206,
      address: '789 Green Road, Chennai, Tamil Nadu'
    },
    verified: false,
    contactPhone: '+91-9876543212',
    description: 'Environmental conservation and sustainable living promotion.'
  }
];