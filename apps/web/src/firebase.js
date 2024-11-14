// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyWUB1UKreg79RVKNPNAIiJs0iAt5kyvs",
  authDomain: "spiral-ticket.firebaseapp.com",
  projectId: "spiral-ticket",
  storageBucket: "spiral-ticket.firebasestorage.app",
  messagingSenderId: "386201013641",
  appId: "1:386201013641:web:ce09a3259b171d4d0e6558",
  measurementId: "G-1T0Y0NXXVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);