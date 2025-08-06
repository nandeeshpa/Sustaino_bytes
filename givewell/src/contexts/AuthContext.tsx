import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  register: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (email: string, password: string, fullName: string, phoneNumber?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send email verification
      await sendEmailVerification(user);
      
      // Create user document in Firestore
      const newUser: User = {
        uid: user.uid,
        email: user.email!,
        fullName,
        phoneNumber,
        points: 0,
        badge: 'None',
        isNGO: false,
        isAdmin: false,
        isVerifiedNGO: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), newUser);
      setUserData(newUser);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      throw error;
    }
  };

  const updateUserData = async (data: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      const updatedData = { ...data, updatedAt: new Date() };
      await updateDoc(doc(db, 'users', currentUser.uid), updatedData);
      
      if (userData) {
        setUserData({ ...userData, ...updatedData });
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as User;
        // Convert Firestore timestamps to Date objects
        data.createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt);
        data.updatedAt = data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    register,
    login,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};