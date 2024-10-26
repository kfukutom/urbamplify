import "./Buttons.css";

export const Buttons = ({ isDark }) => {
  return (
    <div className="btn-container">
      <button
        id="check"
        className={`button-19 ${isDark ? "dark-mode" : "light-mode"}`}
      >
         Explore 🏙️
      </button>
    </div>
  );
};

