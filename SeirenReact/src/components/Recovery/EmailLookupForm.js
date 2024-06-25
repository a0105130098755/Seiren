import React, { useState } from "react";
import { findEmail } from "../../api/Api";
import "./PasswordRecoveryEmailLookup.css"; // 필요한 스타일을 가져오기 위해 임포트

const EmailLookupForm = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [foundEmail, setFoundEmail] = useState("");

  const handleNicknameChange = (e) => setNickname(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFoundEmail("");

    if (!nickname) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const email = await findEmail(nickname);
      setFoundEmail(email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form lookup-form wrapper">
      <h2>등록된 이메일 찾기</h2>
      <div className="input box">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      {foundEmail && <div className="success">등록된 이메일: {foundEmail}</div>}
      <button type="submit" className="button">
        이메일 찾기
      </button>
    </form>
  );
};

export default EmailLookupForm;
