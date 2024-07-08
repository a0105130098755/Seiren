import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import api from "../api/axiosInstance";

const useTokenAxios = () => {
  const { setLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenAxios = async (axiosEvt) => {
    setIsLoading(true);
    try {
      await axiosEvt();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("AccessToken 만료");
        try {
          const newToken = await requestRefreshToken();
          localStorage.setItem("accessToken", newToken);
          await axiosEvt();
        } catch (error) {
          console.error("토큰 재발행 실패:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setLoginStatus("RELOGIN");
          navigate("/");
        }
      } else {
        console.error("요청 실패:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleTokenAxios, isLoading };
};

export default useTokenAxios;

const requestRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("/auth/reissued", { refreshToken });
  if (response.status === 200) {
    return response.data.accessToken;
  } else {
    throw new Error("토큰 재발행에 실패했습니다.");
  }
};
