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
    handleAxiosError(
      error,
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
  }
};

export const requestRefreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "토큰 재발행에 실패했습니다. 다시 시도해주세요.");
  }
};

export const loginWithGoogle = async (tokenId: string) => {
  try {
    const response = await api.post("/google-login", { tokenId });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구글 로그인에 실패했습니다. 다시 시도해주세요.");
  }
};

export const signUp = async (userData: {
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
    handleAxiosError(error, "회원 가입에 실패했습니다. 다시 시도해주세요.");
  }
};

export const sendEmailCode = async (email: string) => {
  try {
    const response = await api.get("/auth/sendmail", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "인증번호 발송에 실패했습니다. 다시 시도해주세요.");
  }
};

export const checkNickname = async (nickname: string) => {
  try {
    const response = await api.get("/check-nickname", {
      params: { nickname },
    });
    return response.data.isUnique;
  } catch (error) {
    handleAxiosError(
      error,
      "닉네임 중복 확인에 실패했습니다. 다시 시도해주세요."
    );
  }
};

export const checkPhone = async (phone: string) => {
  try {
    const response = await api.get("/check-phone", {
      params: { phone },
    });
    return response.data.isUnique;
  } catch (error) {
    handleAxiosError(
      error,
      "전화번호 중복 확인에 실패했습니다. 다시 시도해주세요."
    );
  }
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  } else {
    throw new Error(defaultMessage);
  }
};

export default api;
