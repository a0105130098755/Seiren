import React, { useEffect, useState } from "react";
import KakaoApi from "../../api/kakaoApi";
import CryptoJS from "crypto-js";

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
      console.log("인가 code : ", code);
      getAccessToken(code);
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      const rsp = await KakaoApi.getToken(code, REST_API_KEY, REDIRECT_URI);
      setActoken(rsp.data);
    } catch (e) {
      console.log("카카오 로그인 에러 : ", e);
    }
  };
  useEffect(() => {
    if (actoken !== "") {
      console.log("actoken : ", actoken.access_token);
      getJWT(actoken.access_token);
    }
  }, [actoken]);

  const getJWT = async (token) => {
    try {
      console.log(token);
      const response = await KakaoApi.getInfo(token);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "nickname",
        CryptoJS.AES.encrypt(
          response.data.nickname,
          process.env.REACT_APP_SECRET_KEY
        ).toString()
      );
      localStorage.setItem("profile", response.data.profile);
    } catch (error) {
      console.error("토큰발행실패:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="kakao-login-button"
        onClick={handleLogin}
      >
        카카오로 로그인
      </button>
    </>
  );
};

export default KakaoLoginButton;
