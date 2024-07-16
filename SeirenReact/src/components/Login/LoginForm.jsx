import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/AuthApi";
import KakaoLoginButton from "./KakaoLoginButton";
import "./LoginForm.css";
import NavBar from "../Navbar/NavBar";
import CryptoJS from "crypto-js";

// LoginForm 컴포넌트: 사용자 로그인 폼을 제공
const LoginForm = () => {
  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 입력 핸들러
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 폼 유효성 검사
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

  // 로그인 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      try {
        const data = await login(email, password);
        // 로그인 성공 시 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("tokenExpiresIn", data.tokenExpiresIn);
        localStorage.setItem(
          "nickname",
          CryptoJS.AES.encrypt(
            data.nickname,
            process.env.REACT_APP_SECRET_KEY
          ).toString()
        );
        localStorage.setItem("profile", data.profile);
        alert("환영합니다!");
        navigate("/main");
      } catch (error) {
        handleError(error);
      }
    }
  };

  // 에러 처리 함수
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
          {/* 이메일 입력 필드 */}
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
          {/* 비밀번호 입력 필드 */}
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
          {/* 에러 메시지 표시 */}
          {error && <div className="error">{error}</div>}
          {/* 아이디/비밀번호 찾기 링크 */}
          <div className="remember-forgot">
            <Link to="/recovery">아이디/비밀번호 찾기</Link>
          </div>
          {/* 회원가입 링크 */}
          <div className="register">
            <Link to="/signup">회원가입 하시겠어요?</Link>
          </div>
          {/* 로그인 버튼 */}
          <button type="submit" className="button">
            로그인
          </button>
          {/* 카카오 로그인 버튼 */}
          <KakaoLoginButton />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
