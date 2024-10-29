import React from "react";
import "./Buttons.css";

export const Buttons = ({ isDark, handleNavigate }) => {
  return (
    <div className="btn-container">
      <button
        id="check"
        className={`button-19 ${isDark ? "dark-mode" : "light-mode"}`}
        onClick={handleNavigate}  // Calls the handleNavigate function from props
      >
        Get Started
      </button>
    </div>
  );
};

export default Buttons;