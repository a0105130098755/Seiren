import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login, requestRefreshToken } from "../api/Api";
import "./LoginForm.css";
import NavBar from "./NavBar";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60 * 1000); // 1분마다 확인
    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
        console.log("Login Response Data:", data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("Tokens saved to localStorage");
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = (error as any).message;
        setError(errorMessage || "로그인에 실패했습니다. 다시 시도해주세요.");
        console.error("Login Error:", errorMessage);
      }
    }
  };

  const checkTokenExpiration = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenExp = JSON.parse(atob(accessToken.split(".")[1])).exp * 1000;
      const bufferTime = 60 * 1000; // 1분 전
      console.log("Token expiration time:", new Date(tokenExp));
      if (Date.now() >= tokenExp - bufferTime) {
        try {
          const storedRefreshToken = localStorage.getItem("refreshToken");
          if (storedRefreshToken) {
            console.log("Refreshing token...");
            const data = await requestRefreshToken(storedRefreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            console.log("Token refreshed:", data);
          } else {
            console.log("No refresh token available");
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          handleLogout();
        }
      }
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("Tokens removed from localStorage");
    navigate("/login");
  };

  return (
    <>
      <NavBar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form login-form">
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
          <button type="submit">로그인</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
