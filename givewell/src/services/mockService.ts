import { Donation, User } from '../types';
import { sampleDonations } from '../utils/sampleData';

// Mock service to simulate Firebase operations using localStorage
export class MockService {
  private static readonly DONATIONS_KEY = 'givewell_donations';
  private static readonly USERS_KEY = 'givewell_users';

  // Initialize mock data if not exists
  static initializeMockData() {
    if (!localStorage.getItem(this.DONATIONS_KEY)) {
      const donationsWithIds = sampleDonations.map((donation, index) => ({
        ...donation,
        id: `donation_${index + 1}`
      }));
      localStorage.setItem(this.DONATIONS_KEY, JSON.stringify(donationsWithIds));
    }
  }

  // Donation operations
  static async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const donations = this.getDonationsFromStorage();
    const newId = `donation_${Date.now()}`;
    const newDonation: Donation = {
      ...donation,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    donations.push(newDonation);
    localStorage.setItem(this.DONATIONS_KEY, JSON.stringify(donations));
    return newId;
  }

  static async getDonations(filters?: {
    category?: string;
    status?: string;
    donorId?: string;
    limit?: number;
  }): Promise<Donation[]> {
    let donations = this.getDonationsFromStorage();

    // Apply filters
    if (filters?.category) {
      donations = donations.filter(d => d.category === filters.category);
    }
    
    if (filters?.status) {
      donations = donations.filter(d => d.status === filters.status);
    }
    
    if (filters?.donorId) {
      donations = donations.filter(d => d.donorId === filters.donorId);
    }

    // Sort by creation date (newest first)
    donations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply limit
    if (filters?.limit) {
      donations = donations.slice(0, filters.limit);
    }

    return donations;
  }

  static async getDonationById(id: string): Promise<Donation | null> {
    const donations = this.getDonationsFromStorage();
    return donations.find(d => d.id === id) || null;
  }

  static async updateDonation(id: string, updates: Partial<Donation>): Promise<void> {
    const donations = this.getDonationsFromStorage();
    const index = donations.findIndex(d => d.id === id);
    
    if (index !== -1) {
      donations[index] = {
        ...donations[index],
        ...updates,
        updatedAt: new Date()
      };
      localStorage.setItem(this.DONATIONS_KEY, JSON.stringify(donations));
    }
  }

  static async acceptDonation(donationId: string, acceptedBy: string, acceptedByName: string): Promise<void> {
    await this.updateDonation(donationId, {
      status: 'Accepted',
      acceptedBy,
      acceptedByName
    });
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
    const donated = await this.getDonations({ donorId: userId });
    const allAccepted = await this.getDonations({ status: 'Accepted' });
    const received = allAccepted.filter(donation => donation.acceptedBy === userId);

    return { donated, received };
  }

  // Helper methods
  private static getDonationsFromStorage(): Donation[] {
    const stored = localStorage.getItem(this.DONATIONS_KEY);
    if (!stored) return [];
    
    const donations = JSON.parse(stored);
    // Convert date strings back to Date objects
    return donations.map((d: any) => ({
      ...d,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
      expiryDate: d.expiryDate ? new Date(d.expiryDate) : undefined
    }));
  }

  // User operations (simplified for demo)
  static async createUser(userData: Omit<User, 'uid' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const users = this.getUsersFromStorage();
    const newId = `user_${Date.now()}`;
    const newUser: User = {
      ...userData,
      uid: newId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return newId;
  }

  static async getUserById(uid: string): Promise<User | null> {
    const users = this.getUsersFromStorage();
    return users.find(u => u.uid === uid) || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const users = this.getUsersFromStorage();
    return users.find(u => u.email === email) || null;
  }

  static async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    const users = this.getUsersFromStorage();
    const index = users.findIndex(u => u.uid === uid);
    
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...updates,
        updatedAt: new Date()
      };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  private static getUsersFromStorage(): User[] {
    const stored = localStorage.getItem(this.USERS_KEY);
    if (!stored) return [];
    
    const users = JSON.parse(stored);
    // Convert date strings back to Date objects
    return users.map((u: any) => ({
      ...u,
      createdAt: new Date(u.createdAt),
      updatedAt: new Date(u.updatedAt)
    }));
  }

  // Clear all data (for testing)
  static clearAllData() {
    localStorage.removeItem(this.DONATIONS_KEY);
    localStorage.removeItem(this.USERS_KEY);
  }
}