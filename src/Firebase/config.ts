// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey,
  authDomain: "todo-management-app-94302.firebaseapp.com",
  projectId: "todo-management-app-94302",
  storageBucket: "todo-management-app-94302.firebasestorage.app",
  messagingSenderId: "517334135687",
  appId: "1:517334135687:web:e986411123650b4ffc9922",
  measurementId: "G-5KVY4HR34Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
