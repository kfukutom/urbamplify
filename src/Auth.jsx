import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config/firebaseConfig";
import RingLoader from "react-spinners/RingLoader";
import { StyleSheet } from "react-native";
import "./Auth.css";

const Auth = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      setError("Failed to log in. Please check your credentials.");
      setShake(true);
      console.error(err);
      setTimeout(() => setShake(false), 500);
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
          <RingLoader color="#333fff" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <h2 className="form-title">
            urb<span style={{ color: '#333fff', fontWeight: 'bold' }}>amplify&nbsp;</span>
            <span style={{ fontSize: 12 }}>v1.1.2</span>
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

            <a href="#" className="forgot-password-link">Forgot password?</a>
            <button type="submit" className="login-button">Log In</button>
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
})

export default Auth;