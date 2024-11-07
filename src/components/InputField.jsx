import { useState } from "react";

const InputField = ({ type, placeholder, icon, onChange, error }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`input-wrapper ${error ? 'error-outline' : ''}`}>
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
        required
        onChange={handleChange}
      />
      <i className="material-symbols-rounded">{icon}</i>
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
};

export default InputField;
