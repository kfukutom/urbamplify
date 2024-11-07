import "./Logo.css";

export const Logo = ({ isChecked }) => {
  return (
    <div className="logo-container">
      <a href="https://github.com/kfukutom" className="logo-link">
        {isChecked ? "/kfukutom.dark" : "/kfukutom.dev"}
      </a>
    </div>
  );
};

export default Logo;
