import "./Logo.css";

export const Logo = ({ handleChange, isChecked }) => {
  return (
    <div className="logo-container">
      <li>
        <a href="https://github.com/kfukutom">
        /kfukutom 🖥️
        </a>
      </li>
      <label htmlFor="check"></label>
    </div>
  );
}