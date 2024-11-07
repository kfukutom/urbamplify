import "./Toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="parent-container">
      <div className="toggle-container">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          checked={isChecked} // Use isChecked to control the toggle state
          onChange={handleChange} // Attach the handleChange function to onChange
        />
        <label htmlFor="check" className="toggle-logo">
          {isChecked ? "🌙" : "☀️"}
        </label>
      </div>
    </div>
  );
};

export default Toggle;
