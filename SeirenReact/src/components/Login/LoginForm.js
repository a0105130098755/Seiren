import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/Api";
import KakaoLoginButton from "./KakaoLoginButton";
import "./LoginForm.css";
import NavBar from "../Navbar/NavBar";

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
        localStorage.setItem("tokenExpiresIn", data.tokenExpiresIn);
        localStorage.setItem("nickname", data.nickname);
        sessionStorage.setItem("nickname", data.nickname);
        localStorage.setItem("profile", data.profile);
        sessionStorage.setItem("profile", data.profile);
        alert("환영합니다!");
        navigate("/main");
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setError("잘못된 요청입니다. 입력한 정보를 확인해주세요.");
          break;
        case 401:
          setError("이메일 또는 비밀번호가 잘못되었습니다.");
          break;
        case 404:
          setError("서버를 찾을 수 없습니다. 나중에 다시 시도해주세요.");
          break;
        case 500:
          setError("서버에 오류가 발생했습니다. 나중에 다시 시도해주세요.");
          break;
        default:
          setError("알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    } else if (error.request) {
      setError("서버로부터 응답이 없습니다. 네트워크를 확인해주세요.");
    } else {
      setError("요청을 생성하는 중 오류가 발생했습니다.");
    }
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
            <Link to="/recovery">아이디/비밀번호 찾기</Link>
          </div>
          <div className="register">
            <Link to="/signup">회원가입 하시겠어요?</Link>
          </div>
          <button type="submit" className="button">
            로그인
          </button>
          <KakaoLoginButton />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
