import api, { handleAxiosError } from "./Api";

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

export const fetchReceivedApplications = async (hiringDTO) => {
  try {
    const response = await api.post("/send/receive", hiringDTO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Fetched received applications:", response.data); // 로그 추가
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching received applications:",
      error.response?.data || error.message
    );
    throw new Error("받은 신청 목록을 불러오는데 실패했습니다.");
  }
};

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
