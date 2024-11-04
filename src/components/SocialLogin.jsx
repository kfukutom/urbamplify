import appleSvg from '../assets/apple.svg';
import googleSvg from '../assets/google.svg';

const SocialLogin = () => {
  return (
    <div className="social-login">
      <button className="social-button">
        <img src={googleSvg} alt="Google" className="social-icon" />
        Google
      </button>
      <button className="social-button">
        <img src={appleSvg} alt="Apple" className="social-icon" />
        Apple
      </button>
    </div>
  )
}

export default SocialLogin;