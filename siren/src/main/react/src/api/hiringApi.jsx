import api, { handleAxiosError } from "./Api";

/**
 * 새로운 구인 글을 작성합니다.
 * @param {Object} hiringData 구인 글 데이터
 * @returns {Promise<Object>} 생성된 구인 글 정보
 * @throws {Error} 구인 글 작성 실패 시 에러
 */
export const createHiring = async (hiringData) => {
  try {
    const response = await api.post("/hiring/save", hiringData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구인구직 글 작성에 실패했습니다.");
  }
};

/**
 * 구인 글 목록을 가져옵니다.
 * @param {number} page 페이지 번호
 * @param {number} size 페이지당 항목 수
 * @returns {Promise<Object>} 구인 글 목록 데이터
 * @throws {Error} 구인 글 목록 조회 실패 시 에러
 */
export const fetchHiringList = async (page, size) => {
  try {
    const response = await api.get("/hiring/searchName", {
      params: { nickname: "", page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구인구직 목록을 가져오는데 실패했습니다.");
  }
};

/**
 * 제목으로 구인 글을 검색합니다.
 * @param {string} title 검색할 제목
 * @param {number} page 페이지 번호
 * @param {number} size 페이지당 항목 수
 * @returns {Promise<Object>} 검색 결과 데이터
 * @throws {Error} 검색 실패 시 에러
 */
export const searchHiringByTitle = async (title, page, size) => {
  try {
    const response = await api.get("/hiring/searchTitle", {
      params: { title, page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "제목으로 구인구직 검색에 실패했습니다.");
  }
};

/**
 * 작성자 닉네임으로 구인 글을 검색합니다.
 * @param {string} nickname 검색할 닉네임
 * @param {number} page 페이지 번호
 * @param {number} size 페이지당 항목 수
 * @returns {Promise<Object>} 검색 결과 데이터
 * @throws {Error} 검색 실패 시 에러
 */
export const searchHiringByNickname = async (nickname, page, size) => {
  try {
    const response = await api.get("/hiring/searchName", {
      params: { nickname, page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "작성자로 구인구직 검색에 실패했습니다.");
  }
};

/**
 * 현재 사용자의 구인 글 목록을 가져옵니다.
 * @returns {Promise<Object>} 사용자의 구인 글 목록 데이터
 * @throws {Error} 조회 실패 시 에러
 */
export const fetchMyHiring = async () => {
  try {
    const response = await api.get("/hiring/myHiring", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "내 구인구직 글 목록을 가져오는데 실패했습니다.");
  }
};

/**
 * 특정 구인 글의 상세 정보를 가져옵니다.
 * @param {number} id 구인 글 ID
 * @returns {Promise<Object>} 구인 글 상세 정보
 * @throws {Error} 상세 정보 조회 실패 시 에러
 */
export const fetchHiringDetail = async (id) => {
  try {
    const response = await api.get(`/hiring/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Fetched hiring detail response:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구인 글 상세 정보를 불러오는 데 실패했습니다.");
  }
};

/**
 * 구인 신청을 생성합니다.
 * @param {Object} hiringDTO 구인 글 정보
 * @param {boolean} changeCurrent 현재 상태 변경 여부
 * @returns {Promise<Object>} 생성된 구인 신청 정보
 * @throws {Error} 구인 신청 실패 시 에러
 */
export const createJobApplication = async (hiringDTO, changeCurrent = true) => {
  try {
    const response = await api.post(
      "/send/save",
      { hiringDTO, changeCurrent },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("Job application response:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "구인 신청에 실패했습니다.");
  }
};

/**
 * 받은 구인 신청 목록을 가져옵니다.
 * @param {Object} hiringDTO 구인 글 정보
 * @returns {Promise<Array>} 받은 구인 신청 목록
 * @throws {Error} 목록 조회 실패 시 에러
 */
export const fetchReceivedApplications = async (hiringDTO) => {
  try {
    const response = await api.post("/send/receive", hiringDTO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Fetched received applications:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching received applications:",
      error.response?.data || error.message
    );
    throw new Error("받은 신청 목록을 불러오는데 실패했습니다.");
  }
};

/**
 * 팀 목록을 가져옵니다.
 * @param {Object} hiring 구인 글 정보
 * @returns {Promise<Array>} 팀 목록
 * @throws {Error} 팀 목록 조회 실패 시 에러
 */
export const teamList = async (hiring) => {
  try {
    console.log(hiring);
    const response = await api.post("/hiring/teamList", hiring, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("팀원 가져오는 중 에러 발생 ", e);
  }
};

/**
 * 보낸 구인 신청 목록을 가져옵니다.
 * @returns {Promise<Array>} 보낸 구인 신청 목록
 * @throws {Error} 목록 조회 실패 시 에러
 */
export const fetchSentApplications = async () => {
  try {
    const response = await api.get("/send/send", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Sent applications response:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "보낸 신청 목록을 불러오는 데 실패했습니다.");
  }
};

/**
 * 구인 글을 삭제합니다.
 * @param {Object} hiringDTO 삭제할 구인 글 정보
 * @returns {Promise<Object>} 삭제 결과
 * @throws {Error} 구인 글 삭제 실패 시 에러
 */
export const deleteHiring = async (hiringDTO) => {
  try {
    const response = await api.post(
      "/hiring/delete",
      { id: hiringDTO.id, nickname: hiringDTO.nickname },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("Delete hiring response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting hiring:", error.response.data);
    handleAxiosError(error, "구인 글 삭제에 실패했습니다.");
  }
};

/**
 * 구인 신청 상태를 업데이트합니다.
 * @param {Object} sendDTO 업데이트할 구인 신청 정보
 * @returns {Promise<Object>} 업데이트 결과
 * @throws {Error} 상태 업데이트 실패 시 에러
 */
export const updateApplicationStatus = async (sendDTO) => {
  try {
    const response = await api.post("/send/status", sendDTO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Update application status response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "구인 신청 상태 변경에 실패했습니다."
    );
  }
};

/**
 * 구인 신청을 삭제합니다.
 * @param {Object} sendDTO 삭제할 구인 신청 정보
 * @returns {Promise<Object>} 삭제 결과
 * @throws {Error} 신청 삭제 실패 시 에러
 */
export const deleteApplication = async (sendDTO) => {
  try {
    const response = await api.post("/send/ok", sendDTO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Delete application response:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "신청 글 삭제에 실패했습니다.");
  }
};

/**
 * 팀원을 추방합니다.
 * @param {Object} teamDTO 추방할 팀원 정보
 * @returns {Promise<Object>} 추방 결과
 * @throws {Error} 팀원 추방 실패 시 에러
 */
export const teamKick = async (teamDTO) => {
  try {
    const response = await api.post("/hiring/teamKick", teamDTO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "팀원 추방에 실패했습니다.");
  }
};
