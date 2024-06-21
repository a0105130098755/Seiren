import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "로그인에 실패했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

export const requestRefreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "토큰 재발행에 실패했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

export const signUp = async (userData: {
  username: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  address: string;
  phone: string;
  profileImage: string | null;
}) => {
  try {
    const response = await api.post("/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "회원 가입에 실패했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

export const sendEmailCode = async (email: string) => {
  try {
    const response = await api.get("/auth/sendmail", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "인증번호 발송에 실패했습니다. 다시 시도해주세요."
      );
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

export default api;
