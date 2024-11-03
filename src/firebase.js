// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-fetch-171f9.firebaseapp.com",
  projectId: "next-fetch-171f9",
  storageBucket: "next-fetch-171f9.firebasestorage.app",
  messagingSenderId: "636106549015",
  appId: "1:636106549015:web:b422d254492a13b1d5f952"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);