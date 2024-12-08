import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, resetPassword as firebaseResetPassword } from "./firebase-config/firebaseConfig";
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import "./screen-styles/Auth.css";

const Auth = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [popupMsg, setMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("User is logged in as ", user, new Date().toLocaleTimeString());
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await axios.post('/api/login', {
        email: userCredential.user.email,
        sessionToken: userCredential.user.refreshToken
      });
      navigate("/dashboard");
      console.log("Logged in successfully at ", new Date().toLocaleTimeString());
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    }
    setLoading(false);
    setTimeout(() => setShake(false), 500);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
    } else if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
    } else {
      try {
        await firebaseResetPassword(email);
        setMsg("Please check your inbox for a reset email!");
        setError("");
      } catch (error) {
        setError("Error sending password reset email.");
        console.error("Password reset error:", error);
      }
    }
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <SyncLoader color="#333fff" loading={true} size={15} />
      </div>
    );
  }

  return (
    <div className={`login-container ${loading ? 'no-shadow' : ''}`} data-theme={isDark ? 'dark' : 'light'}>
      <h2 className="form-title">
        urb<span style={{ color: '#333fff', fontWeight: 'bold' }}>amplify&nbsp;</span>
        <span style={{ fontSize: 12 }}>v1.2.2</span>
      </h2>
      <SocialLogin />

      <p className="separator"><span>or</span></p>

      <form onSubmit={handleLogin} className="login-form">
        <InputField
          type="email"
          placeholder="Email address"
          icon="mail"
          onChange={e => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className={`error-message ${shake ? 'shake' : ''}`}>{error}</p>}
        {popupMsg && <p className="popup-message">{popupMsg}</p>}

        <a href="#" className="forgot-password-link" onClick={handleResetPassword}>
          Forgot password?
        </a>
        <button type="submit" className="login-button">Log In</button>
      </form>

      <p className="signup-prompt">
        Don't have an account? <a href="#" className="signup-link">Sign up 🚀</a>
      </p>
      <p>
        <a style={{
          color: '#808080',
          fontSize: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          cursor: 'auto',
        }}>Developed by Ken Fukutomi, 2024</a>
      </p>
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  }
};

export default Auth;