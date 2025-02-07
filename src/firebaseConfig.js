import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHp8twtB4TO2eAlD2ruLxtkjFq0zrF6nU",
  authDomain: "ecommerce-50211.firebaseapp.com",
  projectId: "ecommerce-50211",
  storageBucket: "ecommerce-50211.firebasestorage.app",
  messagingSenderId: "878527421296",
  appId: "1:878527421296:web:3e6cf9eb0e356f52c9cdb5"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
