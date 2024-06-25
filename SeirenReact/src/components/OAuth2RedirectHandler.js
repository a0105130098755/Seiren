import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../api/Api";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");

    if (token) {
      // 백엔드로 토큰 전송 및 로그인 처리
      loginWithGoogle(token)
        .then((data) => {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          alert("환영합니다!");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Google 로그인 실패:", error);
          alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/login");
        });
    } else {
      alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Google 로그인 중...</div>;
};

export default OAuth2RedirectHandler;
