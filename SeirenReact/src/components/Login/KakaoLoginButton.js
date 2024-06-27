import React, { useEffect, useState } from "react";
import axios from "axios";

const KakaoLoginButton = () => {
  const [actoken, setActoken] = useState("");
  const REST_API_KEY = "3483d43e70f7405b4a844806a7759d29";
  const REDIRECT_URI = "http://localhost:3000/login";

  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      getAccessToken(code);
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      const response = await axios.get(`localhost:8111/auth/kakao`, {
        params: { accessToken: code },
      });
    } catch (error) {
      console.error("Failed to get access token:", error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogin}>
        카카오로 로그인
      </button>
    </>
  );
};

export default KakaoLoginButton;
