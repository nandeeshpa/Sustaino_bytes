import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Firebase configuration - In production, use environment variables
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "givewell-demo.firebaseapp.com",
  projectId: "givewell-demo",
  storageBucket: "givewell-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo",
  databaseURL: "https://givewell-demo-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app;