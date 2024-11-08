import React from "react";
import "./Buttons.css";

export const Buttons = ({ isDark, handleNavigate, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="btn-container">
      <button
        id="check"
        className={`button-19 ${isDark ? "dark-mode" : "light-mode"}`}
        onClick={handleNavigate} 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Get Started
      </button>
    </div>
  );
};

export default Buttons;