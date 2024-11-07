import { useNavigate } from 'react-router-dom';
import appleSvg from '../assets/apple.svg';
import googleSvg from '../assets/google.svg';
import { View, Text, StyleSheet } from 'react-native';

const SocialLogin = () => {
  return (
    <div className="social-login">
      <button className="social-button">
        <img src={googleSvg} alt="Google" className="social-icon" />
        Google
      </button>
      <button className="social-button">
        <img src={appleSvg} alt="Apple" style={styles.AppleIcon} />
        Apple
      </button>
    </div>
  )
}

const styles = StyleSheet.create({
  AppleIcon: {
    width: 26,
    height: 28,
  }
})

export default SocialLogin;