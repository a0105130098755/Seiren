import api, { handleAxiosError } from "./Api";

export const fetchUserInfo = async () => {
  try {
    const response = await ChatApi.memberInfo();
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
};

export const updateUserInfo = async (userData) => {
  try {
    const response = await api.put("/auth/update-user", userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error("사용자 정보 업데이트에 실패했습니다.");
  }
};
