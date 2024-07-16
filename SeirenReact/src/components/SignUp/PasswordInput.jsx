import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// PasswordInput 컴포넌트: 비밀번호 입력 필드와 유효성 검사 기능 제공
const PasswordInput = ({ name }) => {
  // 비밀번호 상태
  const [password, setPassword] = useState("");
  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);
  // 에러 상태
  const [errors, setErrors] = useState({});

  // 비밀번호 유효성 검사 함수
  // 최소 8자, 하나의 숫자, 하나의 특수 문자 포함 여부 확인
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // 비밀번호 입력 핸들러
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
      {/* 비밀번호 표시/숨김 토글 버튼 */}
      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {/* 에러 메시지 표시 */}
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
};

export default PasswordInput;
