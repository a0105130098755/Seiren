import api, { handleAxiosError } from "./Api";

/**
 * 현재 로그인한 사용자의 정보를 가져옵니다.
 *
 * @returns {Promise<Object>} 사용자 정보 객체
 * @throws {Error} 사용자 정보 조회 실패 시 에러
 */
export const fetchUserInfo = async () => {
  try {
    const response = await ChatApi.memberInfo();
    return response.data;
  } catch (error) {
    handleAxiosError(error, "사용자 정보를 가져오는데 실패했습니다.");
  }
};

/**
 * 사용자 정보를 업데이트합니다.
 *
 * @param {Object} userData - 업데이트할 사용자 정보
 * @returns {Promise<Object>} 업데이트된 사용자 정보
 * @throws {Error} 사용자 정보 업데이트 실패 시 에러
 */
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
