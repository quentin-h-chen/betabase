import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "betabase-170f0.firebaseapp.com",
  projectId: "betabase-170f0",
  storageBucket: "betabase-170f0.firebasestorage.app",
  messagingSenderId: "370660669055",
  appId: "1:370660669055:web:c0d933fb2c795c2fb6314a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
