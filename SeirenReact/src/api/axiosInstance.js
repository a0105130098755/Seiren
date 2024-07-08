// src/api/axiosInstance.js
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";

const api = axios.create({
  baseURL: "http://localhost:8111/",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosInstance = () => {
  const { setLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [axiosInstance, setAxiosInstance] = useState(api);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newToken = await requestRefreshToken();
            localStorage.setItem("accessToken", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (error) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setLoginStatus("RELOGIN");
            navigate("/");
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, navigate, setLoginStatus]);

  const requestRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await api.post("/auth/reissued", { refreshToken });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("토큰 재발행에 실패했습니다:", error);
      throw error;
    }
  };

  return axiosInstance;
};

export default useAxiosInstance;
