import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'womanup-backend-9ab48.firebaseapp.com',
  projectId: 'womanup-backend-9ab48',
  storageBucket: 'womanup-backend-9ab48.appspot.com',
  messagingSenderId: '760434050530',
  appId: '1:760434050530:web:84d038de1cf4b797c8a5bb',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
