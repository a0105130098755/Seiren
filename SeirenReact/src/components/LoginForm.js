import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/Api";
import "./LoginForm.css";
import NavBar from "./NavBar";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (!email || !password) {
      setError("모든 필드를 입력해주세요.");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      try {
        const data = await login(email, password);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        alert("환영합니다!");
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error.message;
        setError(
          errorMessage ||
            "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
        );
      }
    }
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth2/redirect";
    const scope = "openid profile email";
    const responseType = "token";
    const state = "random_state_string"; // 선택 사항

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;

    window.location.href = googleLoginUrl;
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form login-form wrapper">
          <h1>로그인</h1>
          <div className="input box">
            <input
              type="text"
              placeholder="UserEmail"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <MdAlternateEmail className="icon" />
          </div>
          <div className="input box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FaLock className="icon" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="remember-forgot">
            <a href="#">비밀번호를 잊으셨나요?</a>
          </div>
          <div className="register">
            <Link to="/signup">회원가입 하시겠어요?</Link>
          </div>
          <button type="submit" className="button">
            로그인
          </button>
          <button type="button" className="button" onClick={handleGoogleLogin}>
            Google 로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
