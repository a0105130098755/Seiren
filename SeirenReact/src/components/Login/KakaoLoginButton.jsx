import React, { useEffect, useState } from "react";
import KakaoApi from "../../api/kakaoApi";
import CryptoJS from "crypto-js";

// KakaoLoginButton 컴포넌트: 카카오 소셜 로그인 기능을 제공
const KakaoLoginButton = () => {
  // 카카오 엑세스 토큰 상태
  const [actoken, setActoken] = useState("");

  // 카카오 개발자 콘솔에서 가져온 REST API 키
  const REST_API_KEY = "3483d43e70f7405b4a844806a7759d29";
  // 카카오 로그인 후 리다이렉트될 URI
  const REDIRECT_URI = "http://localhost:3000/login";

  // 카카오 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  // 컴포넌트 마운트 시 URL에서 인가 코드 추출
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      console.log("인가 code : ", code);
      getAccessToken(code);
    }
  }, []);

  // 카카오 액세스 토큰 요청 함수
  const getAccessToken = async (code) => {
    try {
      const rsp = await KakaoApi.getToken(code, REST_API_KEY, REDIRECT_URI);
      setActoken(rsp.data);
    } catch (e) {
      console.log("카카오 로그인 에러 : ", e);
      // TODO: 사용자에게 오류 메시지 표시
    }
  };

  // actoken이 변경될 때마다 JWT 토큰 요청
  useEffect(() => {
    if (actoken !== "") {
      console.log("actoken : ", actoken.access_token);
      getJWT(actoken.access_token);
    }
  }, [actoken]);

  // JWT 토큰 요청 및 로컬 스토리지에 사용자 정보 저장
  const getJWT = async (token) => {
    try {
      console.log(token);
      const response = await KakaoApi.getInfo(token);
      console.log(response.data.accessToken);

      // 로컬 스토리지에 사용자 정보 저장
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

      // TODO: 로그인 성공 후 리다이렉트 또는 상태 업데이트
    } catch (error) {
      console.error("토큰발행실패:", error);
      // TODO: 사용자에게 오류 메시지 표시
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
