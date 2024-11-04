import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import './Auth.css';

const Auth = ({ isDark }) => {

  // Initalize Navigation Pathway(s)
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
    console.log("Test success. Navigated to the signup page.");
  }

  const navigateToForgotPassword = () => { navigate("/forgot-password"); }

  return (
    <div className="login-container" data-theme={isDark ? 'dark' : 'light'}>
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />

      <p className="separator"><span>or</span></p>

      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" />

        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="login-button">Log In</button>
      </form>

      <p className="signup-prompt">
        Don&apos;t have an account? <a href="#" className="signup-link">Sign up</a>
      </p>
    </div>
  )
}

export default Auth;
