import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appleSvg from '../assets/apple.svg';
import googleSvg from '../assets/google.svg';
import { StyleSheet } from 'react-native';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../../backend/firebase-config/firebaseConfig";

const SocialLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false); // Add shake state if using animations
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);
  
  // global const
  let globalUsername;
  const googleNavigate = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
      var user = auth.currentUser;
      if (user) {
        globalUsername = user.displayName;
        localStorage.setItem('globalUsername', globalUsername);
        console.log(`Username: ${user.displayName}`);
      }
    } catch (err) {
      // Should never reach this statement.
      alert("Failed to log in with Google. Please try again.");
      console.error(err);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="social-login">
      <button onClick={googleNavigate} className="social-button">
        <img src={googleSvg} alt="Google" className="social-icon" />
        Google
      </button>
      <button className="social-button">
        <img src={appleSvg} alt="Apple" className="social-icon" style={styles.AppleIcon} />
        Apple
      </button>
      {error && (
        <p className={`error-message ${shake ? 'shake' : ''}`}>{error}</p>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  AppleIcon: {
    width: 26,
    height: 28,
  }
});

export default SocialLogin;