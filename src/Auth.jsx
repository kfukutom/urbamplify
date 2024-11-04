import { useState } from "react";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config/firebaseConfig";
import "./Auth.css";

const Auth = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      setShake(true); // Trigger shake effect
      console.error(err);

      // Remove shake class after animation duration to allow re-triggering
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="login-container" data-theme={isDark ? 'dark' : 'light'}>
      <h2 className="form-title">Log in with</h2>
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
        Don&apos;t have an account? <a href="#" className="signup-link">Sign up</a>
      </p>
    </div>
  );
};

export default Auth;