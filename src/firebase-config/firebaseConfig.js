// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeq6FlBYcSiiwJ0yMvnzpTGsRtTK807wE",
  authDomain: "urbamplify.firebaseapp.com",
  projectId: "urbamplify",
  storageBucket: "urbamplify.firebasestorage.app",
  messagingSenderId: "302929918801",
  appId: "1:302929918801:web:cc55d9e9169b49b0c1f170",
  measurementId: "G-GV21RVW0DV"
};

// Firebase DB Initialization!
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Login Functionality:
function signInWithGoogle(navigate) {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(`Username: ${result.user.displayName}`);
      if (navigate) navigate('/dashboard');
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
}

// REQUIRES: email is a valid email address
function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      console.error("Error during password reset:", error);
    });
}

export { app, analytics, auth, googleProvider, signInWithGoogle, resetPassword };