import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserInfo = async () => {
  try {
    const response = await ChatApi.memberInfo();
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
};

export const handleAxiosError = (error, defaultMessage) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(defaultMessage);
  }
};

export default api;
