import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login, requestRefreshToken, loginWithGoogle } from "../api/Api";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import "./LoginForm.css";
import NavBar from "./NavBar";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(
    "Google Client ID in LoginForm:",
    process.env.REACT_APP_GOOGLE_CLIENT_ID
  ); // 환경 변수 확인

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const validateForm = (): boolean => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      try {
        const data = await login(email, password);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError(
          errorMessage ||
            "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
        );
      }
    }
  };

  const onSuccess = async (response: CredentialResponse) => {
    try {
      const data = await loginWithGoogle(response.credential as string);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/dashboard");
    } catch (error) {
      setError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onFailure = () => {
    setError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
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
          <div className="google-login-button">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onFailure}
              useOneTap
              auto_select
              width="100%"
            />
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
