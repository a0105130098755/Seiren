import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { forgotPassword } from "../../api/Api";
import "./PasswordRecoveryEmailLookup.css"; // 필요한 스타일을 가져오기 위해 임포트

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPassword("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await forgotPassword(email);
      setPassword(response.password); // assuming response contains the password or reset link
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form recovery-form wrapper">
      <h2>비밀번호 찾기</h2>
      <div className="input box">
        <input
          type="text"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <MdAlternateEmail className="icon" />
      </div>
      {error && <div className="error">{error}</div>}
      {password && <div className="success">비밀번호: {password}</div>}
      <button type="submit" className="button">
        비밀번호 찾기
      </button>
    </form>
  );
};

export default PasswordRecoveryForm;
