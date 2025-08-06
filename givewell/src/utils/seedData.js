import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

// Seed demo users
export const seedUsers = async () => {
  const demoUsers = [
    {
      uid: 'demo-admin',
      email: 'admin@givewell.com',
      fullName: 'Admin User',
      phoneNumber: '+1234567890',
      profilePicture: '',
      points: 100,
      badge: 'Gold',
      isNGO: false,
      isAdmin: true,
      isVerifiedNGO: false,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
    {
      uid: 'demo-user-1',
      email: 'john@example.com',
      fullName: 'John Doe',
      phoneNumber: '+1234567891',
      profilePicture: '',
      points: 75,
      badge: 'Gold',
      isNGO: false,
      isAdmin: false,
      isVerifiedNGO: false,
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      uid: 'demo-user-2',
      email: 'sarah@example.com',
      fullName: 'Sarah Johnson',
      phoneNumber: '+1234567892',
      profilePicture: '',
      points: 45,
      badge: 'Silver',
      isNGO: false,
      isAdmin: false,
      isVerifiedNGO: false,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      uid: 'demo-ngo-1',
      email: 'info@helpinghandsngo.org',
      fullName: 'Helping Hands NGO',
      phoneNumber: '+1234567893',
      profilePicture: '',
      points: 120,
      badge: 'Gold',
      isNGO: true,
      isAdmin: false,
      isVerifiedNGO: true,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      uid: 'demo-user-3',
      email: 'mike@example.com',
      fullName: 'Mike Wilson',
      phoneNumber: '+1234567894',
      profilePicture: '',
      points: 25,
      badge: 'Silver',
      isNGO: false,
      isAdmin: false,
      isVerifiedNGO: false,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      uid: 'demo-user-4',
      email: 'emma@example.com',
      fullName: 'Emma Davis',
      phoneNumber: '+1234567895',
      profilePicture: '',
      points: 15,
      badge: 'Bronze',
      isNGO: false,
      isAdmin: false,
      isVerifiedNGO: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  try {
    for (const user of demoUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
    }
    console.log('Demo users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Seed demo donations
export const seedDonations = async () => {
  const demoDonations = [
    {
      id: uuidv4(),
      donorId: 'demo-user-1',
      title: 'Fresh Vegetables from Garden',
      description: 'Organic vegetables including tomatoes, carrots, and lettuce. Freshly harvested from my home garden.',
      category: 'Food',
      quantity: '5 kg',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
      location: {
        address: 'Green Valley, Downtown',
        latitude: 40.7128,
        longitude: -74.0060
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: uuidv4(),
      donorId: 'demo-user-2',
      title: 'Winter Clothes for Kids',
      description: 'Gently used winter clothing for children ages 5-10. Includes jackets, sweaters, and warm pants.',
      category: 'Clothes',
      quantity: '15 pieces',
      expiryDate: null,
      imageUrl: 'https://images.unsplash.com/photo-1503342394128-c104d54dba5e?w=500',
      location: {
        address: 'Riverside Community Center',
        latitude: 40.7589,
        longitude: -73.9851
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: uuidv4(),
      donorId: 'demo-ngo-1',
      title: 'Educational Books for Primary School',
      description: 'Collection of textbooks and storybooks suitable for elementary school children. All books are in excellent condition.',
      category: 'Books',
      quantity: '50 books',
      expiryDate: null,
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
      location: {
        address: 'Public Library, Main Street',
        latitude: 40.7505,
        longitude: -73.9934
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
      id: uuidv4(),
      donorId: 'demo-user-3',
      title: 'Home-cooked Meals Ready to Share',
      description: 'Freshly prepared nutritious meals including rice, lentils, and vegetables. Perfect for families in need.',
      category: 'Food',
      quantity: '10 meal portions',
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
      location: {
        address: 'Community Kitchen, Oak Street',
        latitude: 40.7282,
        longitude: -74.0776
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      id: uuidv4(),
      donorId: 'demo-user-4',
      title: 'Household Items and Kitchenware',
      description: 'Various household items including plates, cups, small appliances, and cleaning supplies. All items are clean and functional.',
      category: 'Others',
      quantity: '20 items',
      expiryDate: null,
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
      location: {
        address: 'Elm Street, Apartment Complex',
        latitude: 40.7614,
        longitude: -73.9776
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: uuidv4(),
      donorId: 'demo-user-1',
      title: 'Professional Work Clothes',
      description: 'Business attire including shirts, pants, and blazers. Suitable for job interviews and office work.',
      category: 'Clothes',
      quantity: '8 pieces',
      expiryDate: null,
      imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500',
      location: {
        address: 'Downtown Business District',
        latitude: 40.7480,
        longitude: -73.9857
      },
      status: 'Available',
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()
    }
  ];

  try {
    for (const donation of demoDonations) {
      await addDoc(collection(db, 'donations'), donation);
    }
    console.log('Demo donations seeded successfully');
  } catch (error) {
    console.error('Error seeding donations:', error);
  }
};

// Seed all demo data
export const seedAllData = async () => {
  console.log('Starting to seed demo data...');
  await seedUsers();
  await seedDonations();
  console.log('Demo data seeding completed!');
};