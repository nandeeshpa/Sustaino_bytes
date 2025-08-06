import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

// Donation categories
export const DONATION_CATEGORIES = {
  FOOD: 'Food',
  CLOTHES: 'Clothes',
  BOOKS: 'Books',
  OTHERS: 'Others'
};

// Donation status
export const DONATION_STATUS = {
  AVAILABLE: 'Available',
  ACCEPTED: 'Accepted',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

// Create a new donation
export const createDonation = async (donationData, userId) => {
  try {
    const donation = {
      id: uuidv4(),
      donorId: userId,
      title: donationData.title,
      description: donationData.description,
      category: donationData.category,
      quantity: donationData.quantity,
      expiryDate: donationData.expiryDate || null,
      imageUrl: donationData.imageUrl || '',
      location: donationData.location || {
        address: '',
        latitude: null,
        longitude: null
      },
      status: DONATION_STATUS.AVAILABLE,
      acceptedBy: null,
      acceptedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'donations'), donation);
    return { ...donation, firestoreId: docRef.id };
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

// Get all available donations
export const getAvailableDonations = async (filters = {}) => {
  try {
    let q = query(
      collection(db, 'donations'),
      where('status', '==', DONATION_STATUS.AVAILABLE),
      orderBy('createdAt', 'desc')
    );

    if (filters.category && filters.category !== 'All') {
      q = query(q, where('category', '==', filters.category));
    }

    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const donations = [];
    
    querySnapshot.forEach((doc) => {
      donations.push({
        firestoreId: doc.id,
        ...doc.data()
      });
    });

    return donations;
  } catch (error) {
    console.error('Error getting donations:', error);
    throw error;
  }
};

// Get donation by ID
export const getDonationById = async (donationId) => {
  try {
    const docRef = doc(db, 'donations', donationId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        firestoreId: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Donation not found');
    }
  } catch (error) {
    console.error('Error getting donation:', error);
    throw error;
  }
};

// Accept a donation
export const acceptDonation = async (donationId, userId) => {
  try {
    const docRef = doc(db, 'donations', donationId);
    await updateDoc(docRef, {
      status: DONATION_STATUS.ACCEPTED,
      acceptedBy: userId,
      acceptedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error accepting donation:', error);
    throw error;
  }
};

// Mark donation as delivered
export const markAsDelivered = async (donationId) => {
  try {
    const docRef = doc(db, 'donations', donationId);
    await updateDoc(docRef, {
      status: DONATION_STATUS.DELIVERED,
      deliveredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error marking as delivered:', error);
    throw error;
  }
};

// Get user's donations (both donated and received)
export const getUserDonations = async (userId) => {
  try {
    // Get donations made by user
    const donatedQuery = query(
      collection(db, 'donations'),
      where('donorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    // Get donations accepted by user
    const receivedQuery = query(
      collection(db, 'donations'),
      where('acceptedBy', '==', userId),
      orderBy('acceptedAt', 'desc')
    );

    const [donatedSnapshot, receivedSnapshot] = await Promise.all([
      getDocs(donatedQuery),
      getDocs(receivedQuery)
    ]);

    const donated = [];
    const received = [];

    donatedSnapshot.forEach((doc) => {
      donated.push({
        firestoreId: doc.id,
        ...doc.data()
      });
    });

    receivedSnapshot.forEach((doc) => {
      received.push({
        firestoreId: doc.id,
        ...doc.data()
      });
    });

    return { donated, received };
  } catch (error) {
    console.error('Error getting user donations:', error);
    throw error;
  }
};

// Delete a donation (only by donor)
export const deleteDonation = async (donationId, userId) => {
  try {
    // First verify the user owns this donation
    const donation = await getDonationById(donationId);
    if (donation.donorId !== userId) {
      throw new Error('Unauthorized to delete this donation');
    }

    const docRef = doc(db, 'donations', donationId);
    await deleteDoc(docRef);
    
    return true;
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw error;
  }
};

// Get donations statistics
export const getDonationStats = async () => {
  try {
    const allDonationsSnapshot = await getDocs(collection(db, 'donations'));
    
    let totalDonations = 0;
    let availableDonations = 0;
    let completedDonations = 0;
    const categories = {};

    allDonationsSnapshot.forEach((doc) => {
      const donation = doc.data();
      totalDonations++;
      
      if (donation.status === DONATION_STATUS.AVAILABLE) {
        availableDonations++;
      } else if (donation.status === DONATION_STATUS.DELIVERED) {
        completedDonations++;
      }

      categories[donation.category] = (categories[donation.category] || 0) + 1;
    });

    return {
      totalDonations,
      availableDonations,
      completedDonations,
      categories
    };
  } catch (error) {
    console.error('Error getting donation stats:', error);
    throw error;
  }
};