import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ name }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    let newErrors = { ...errors };
    if (!validatePassword(value)) {
      newErrors[name] =
        "비밀번호는 최소 8자 이상, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다.";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  return (
    <div className="input box full-width">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={name === "password" ? "비밀번호" : "비밀번호 확인"}
        name={name}
        value={password}
        onChange={handleChange}
      />
      <FaLock className="icon" />
      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
};

export default PasswordInput;
