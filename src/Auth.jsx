import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, resetPassword } from "./firebase-config/firebaseConfig"; // Ensure resetPassword is imported
import { SyncLoader } from 'react-spinners';
import { StyleSheet } from "react-native";
import "./screen-styles/Auth.css";

// DEVELOPED BY: KEN FUKUTOMI (2024)
// URBAMPLIFY APP v1.1.2

const Auth = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [popupMsg, setMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/dashboard");
      console.log("Logged in successfully at ", new Date().toLocaleTimeString());
    } catch (err) {
      setLoading(false);
      setMsg("");
      setError("Failed to log in. Please check your credentials.");
      setShake(true);
      console.error(err);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      setMsg("");
      setError("Please enter your email to reset your password.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setError("");
      setMsg("Please check your inbox for a reset email!");
      resetPassword(email)
        .then(() => {
          setError("Password reset email sent!");
        })
        .catch((error) => {
          setError("Error sending password reset email.");
          console.error("Password reset error:", error);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div 
      className={`login-container ${loading ? 'no-shadow' : ''}`} 
      data-theme={isDark ? 'dark' : 'light'}
    >
      {loading ? (
        <div style={styles.loadingIcon}>
          <div className="header-line"></div>
          <div className="sub-header-line"></div>
          <SyncLoader color="#333fff" loading={loading} size={15} />
        </div>
      ) : (
        <>
          <div className="header-line"></div>
          <div className="sub-header-line"></div>
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
              onChange={setEmail}
            />
            <InputField
              type="password"
              placeholder="Password"
              icon="lock"
              onChange={setPassword}
            />

            {error && (
              <p className={`error-message ${shake ? 'shake' : ''}`}>{error}</p>
            )}
            {popupMsg &&  (
              <p className={`popup-message`}>{popupMsg}</p>
            )}

            <a href="#" className="forgot-password-link" onClick={handleResetPassword}>
              Forgot password?
            </a>
            <button type="submit" className="login-button">
              <script>
              console.log('App Token:', process.env.VITE_APP_TOKEN);
              console.log('Firebase API Key:', process.env.VITE_FIREBASE_API_KEY);
              </script>
              Log In
            </button>
          </form>

          <p className="signup-prompt">
            Don&apos;t have an account? <a href="#" className="signup-link">Sign up 🚀</a>
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
        </>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  }
});

export default Auth;