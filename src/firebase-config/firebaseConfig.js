// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeq6FlBYcSiiwJ0yMvnzpTGsRtTK807wE",
  authDomain: "urbamplify.firebaseapp.com",
  projectId: "urbamplify",
  storageBucket: "urbamplify.firebasestorage.app",
  messagingSenderId: "302929918801",
  appId: "1:302929918801:web:cc55d9e9169b49b0c1f170",
  measurementId: "G-GV21RVW0DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };