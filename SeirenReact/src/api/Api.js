import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
  }
};

export const requestRefreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "토큰 재발행에 실패했습니다. 다시 시도해주세요.");
  }
};

export const loginWithGoogle = async (tokenId) => {
  try {
    const response = await api.post("/google-login", { token: tokenId });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구글 로그인에 실패했습니다. 다시 시도해주세요.");
  }
};

export const signUp = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "회원 가입에 실패했습니다. 다시 시도해주세요.");
  }
};

export const sendEmailCode = async (email) => {
  try {
    const response = await api.get("/auth/sendmail", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "인증번호 발송에 실패했습니다. 다시 시도해주세요.");
  }
};

export const checkNickname = async (nickname) => {
  try {
    const response = await api.get("/auth/check-nickname", {
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

export const checkPhone = async (phone) => {
  try {
    const response = await api.get("/auth/check-phone", {
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

const handleAxiosError = (error, defaultMessage) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(defaultMessage);
  }
};

export default api;
