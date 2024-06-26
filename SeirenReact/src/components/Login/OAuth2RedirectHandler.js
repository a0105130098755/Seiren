import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../api/Api";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuth2RedirectHandler 컴포넌트가 마운트되었습니다.");

    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");

    console.log("파싱된 URL 파라미터:", params.toString());
    console.log("추출된 Google 액세스 토큰:", token);

    if (token) {
      console.log(
        "Google 액세스 토큰을 찾았습니다. 백엔드로 검증 요청을 보냅니다."
      );

      loginWithGoogle(token)
        .then((data) => {
          console.log("백엔드로부터 받은 응답 데이터:", data);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          alert("환영합니다!");

          console.log("대시보드로 이동합니다.");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Google 로그인 실패:", error);

          alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
          console.log("로그인 페이지로 이동합니다.");
          navigate("/login");
        });
    } else {
      console.error("URL에서 Google 액세스 토큰을 찾을 수 없습니다.");

      alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
      console.log("로그인 페이지로 이동합니다.");
      navigate("/login");
    }

    return () => {
      console.log("OAuth2RedirectHandler 컴포넌트가 언마운트되었습니다.");
    };
  }, [navigate]);

  return <div>Google 로그인 중...</div>;
};

export default OAuth2RedirectHandler;
