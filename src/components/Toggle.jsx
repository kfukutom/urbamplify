import "./Toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <h1 class="toggle-logo">
        {isChecked ? "🌙" : "☀️"}
      </h1>
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check"></label>
    </div>
  );
}