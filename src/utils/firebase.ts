import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'womanup-backend-9ab48.firebaseapp.com',
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: 'womanup-backend-9ab48.appspot.com',
  messagingSenderId: '760434050530',
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
