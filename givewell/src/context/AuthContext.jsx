import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // User profile model
  const createUserProfile = async (user, additionalData = {}) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email } = user;
      const userProfile = {
        uid: user.uid,
        displayName: displayName || additionalData.fullName || '',
        email,
        fullName: additionalData.fullName || displayName || '',
        phoneNumber: additionalData.phoneNumber || '',
        profilePicture: additionalData.profilePicture || '',
        points: 0,
        badge: 'None',
        isNGO: false,
        isAdmin: false,
        isVerifiedNGO: false,
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      try {
        await setDoc(userRef, userProfile);
        return userProfile;
      } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }
    } else {
      return userSnap.data();
    }
  };

  // Get user profile from Firestore
  const getUserProfile = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, updates) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { ...updates, updatedAt: new Date().toISOString() });
      
      // Update local state
      if (userProfile && userProfile.uid === uid) {
        setUserProfile(prev => ({ ...prev, ...updates }));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Calculate badge based on points
  const calculateBadge = (points) => {
    if (points >= 50) return 'Gold';
    if (points >= 25) return 'Silver';
    if (points >= 10) return 'Bronze';
    return 'None';
  };

  // Add points to user
  const addPoints = async (uid, pointsToAdd) => {
    try {
      const profile = await getUserProfile(uid);
      if (profile) {
        const newPoints = profile.points + pointsToAdd;
        const newBadge = calculateBadge(newPoints);
        await updateUserProfile(uid, { points: newPoints, badge: newBadge });
      }
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  };

  // Sign up
  async function signup(email, password, additionalData) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (additionalData.fullName) {
        await updateProfile(user, { displayName: additionalData.fullName });
      }
      
      // Send email verification
      await sendEmailVerification(user);
      
      // Create user profile in Firestore
      const profile = await createUserProfile(user, additionalData);
      setUserProfile(profile);
      
      return { user, profile };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Login
  async function login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      return { user, profile };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout
  async function logout() {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    addPoints,
    calculateBadge
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}