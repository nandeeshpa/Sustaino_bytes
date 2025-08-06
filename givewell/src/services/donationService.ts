import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Donation } from '../types';
import { MockService } from './mockService';

// For demo purposes, we'll use MockService instead of Firebase
const USE_MOCK = true;

export class DonationService {
  private static readonly COLLECTION_NAME = 'donations';

  static async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (USE_MOCK) {
      return MockService.createDonation(donation);
    }
    
    try {
      const donationData = {
        ...donation,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), donationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  }

  static async getDonations(filters?: {
    category?: string;
    status?: string;
    donorId?: string;
    limit?: number;
  }): Promise<Donation[]> {
    if (USE_MOCK) {
      return MockService.getDonations(filters);
    }
    
    try {
      let q = query(collection(db, this.COLLECTION_NAME));

      // Apply filters
      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters?.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters?.donorId) {
        q = query(q, where('donorId', '==', filters.donorId));
      }

      // Order by creation date (newest first)
      q = query(q, orderBy('createdAt', 'desc'));

      // Apply limit
      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      const donations: Donation[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        donations.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          expiryDate: data.expiryDate ? data.expiryDate.toDate() : undefined
        } as Donation);
      });

      return donations;
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  }

  static async getDonationById(id: string): Promise<Donation | null> {
    if (USE_MOCK) {
      return MockService.getDonationById(id);
    }
    
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          expiryDate: data.expiryDate ? data.expiryDate.toDate() : undefined
        } as Donation;
      }

      return null;
    } catch (error) {
      console.error('Error fetching donation:', error);
      throw error;
    }
  }

  static async updateDonation(id: string, updates: Partial<Donation>): Promise<void> {
    if (USE_MOCK) {
      return MockService.updateDonation(id, updates);
    }
    
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now()
      };

      // Convert Date objects to Timestamps
      if (updates.expiryDate) {
        updateData.expiryDate = Timestamp.fromDate(updates.expiryDate);
      }

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    }
  }

  static async acceptDonation(donationId: string, acceptedBy: string, acceptedByName: string): Promise<void> {
    try {
      await this.updateDonation(donationId, {
        status: 'Accepted',
        acceptedBy,
        acceptedByName
      });
    } catch (error) {
      console.error('Error accepting donation:', error);
      throw error;
    }
  }

  static async getAvailableDonations(limit?: number): Promise<Donation[]> {
    return this.getDonations({
      status: 'Available',
      limit
    });
  }

  static async getUserDonations(userId: string): Promise<{
    donated: Donation[];
    received: Donation[];
  }> {
    try {
      // Get donations made by user
      const donated = await this.getDonations({
        donorId: userId
      });

      // Get donations accepted by user
      const received = await this.getDonations({
        status: 'Accepted'
      });
      
      const receivedByUser = received.filter(donation => donation.acceptedBy === userId);

      return {
        donated,
        received: receivedByUser
      };
    } catch (error) {
      console.error('Error fetching user donations:', error);
      throw error;
    }
  }
}