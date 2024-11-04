import { useState } from "react";

const InputField = ({ type, placeholder, icon, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        required
        onChange={handleChange} // Call onChange function when input changes
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