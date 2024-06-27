import React, { useEffect, useState } from "react";
import KakaoApi from "../../api/KakaoApi";

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
      const response = await KakaoApi.getInfo(token);
      console.log(response.data);
    } catch (error) {
      console.error("토큰발행실패:", error);
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
