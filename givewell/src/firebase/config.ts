import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// For demo purposes, using placeholder config
// In production, these would come from environment variables
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "givewell-demo.firebaseapp.com",
  databaseURL: "https://givewell-demo-default-rtdb.firebaseio.com",
  projectId: "givewell-demo",
  storageBucket: "givewell-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export default app;