import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config/firebaseConfig";
import RingLoader from "react-spinners/RingLoader";
import "./Auth.css";

const Auth = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user login, FIXED ERROR
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Failed to log in. Please check your credentials.");
      console.log(err, "Failed to log in. Please check your credentials.");
      setShake(true);
      console.error(err);
      setTimeout(() => setShake(false), 500);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="login-container no-bg">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
            <RingLoader color="#333fff" loading={loading} size={170} />
          </div>
        </div>
      ) : (
        <div 
          className={`login-container ${loading ? 'no-shadow' : ''}`} 
          data-theme={isDark ? 'dark' : 'light'}
        >
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
        </div>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  ken: {
    color: '#808080',
    fontSize: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    cursor: 'auto',
  }
})

export default Auth;