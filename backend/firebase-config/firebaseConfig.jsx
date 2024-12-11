// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Global Firebase Configuration:
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
//const appleProvider = new AppleAuthProvider();

/* FOR TESTING PURPOSES ONLY
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});
*/

// Google Login Functionality
function signInWithGoogle(navigate) {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(`Username: ${result.user.displayName}`);
      if (navigate) navigate("/dashboard");
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
}

// Deploy for later usage:
function singInWithApple(navigate) {
  signInWithPopup(auth, Apple)
    .then((result) => {
      console.log(`Username: ${result.user.displayName}`); 
      if (navigate) navigate("/dashboard");
    })
    .catch((error) => {
      console.error("Error during Apple sign-in:", error);
      console.error("Error during Apple sign-in:", error);
    });
}

function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      console.error("Error during password reset:", error);
      console.log("Error Password Reset at", error, new Date())
    });
}

// Export Firebase modules/helper functions I've made: 
export { app, analytics, auth, googleProvider, firebaseConfig, signInWithGoogle, resetPassword };