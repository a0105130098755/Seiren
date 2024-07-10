import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const requestRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/reissued", { refreshToken });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("tokenExpiresIn", response.data.accessTokenExpiresIn);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
    } else {
      handleAxiosError(error, "토큰 재발행에 실패했습니다. 다시 시도해주세요.");
    }
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Server response:", response.data); // 추가된 로그
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
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
    return response;
  } catch (error) {
    handleAxiosError(error, "인증번호 발송에 실패했습니다. 다시 시도해주세요.");
  }
};

export const checkExist = async ({ type, value }) => {
  try {
    const response = await api.post("/auth/checkExist", { type, value });
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      `${type} 중복 확인에 실패했습니다. 다시 시도해주세요.`
    );
  }
};

// 이메일 찾기 함수
export const findEmail = async (nickname) => {
  try {
    const response = await checkExist({ type: "nickname", value: nickname });
    if (response) {
      return response;
    } else {
      throw new Error("입력하신 닉네임과 일치하는 이메일을 찾을 수 없습니다.");
    }
  } catch (error) {
    handleAxiosError(
      error,
      "입력하신 닉네임과 일치하는 이메일을 찾을 수 없습니다."
    );
  }
};

// 비밀번호 찾기 함수
export const forgotPassword = async (email) => {
  try {
    const response = await checkExist({ type: "email", value: email });
    if (response) {
      return response;
    } else {
      throw new Error("입력하신 이메일과 일치하는 사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    handleAxiosError(
      error,
      "입력하신 이메일과 일치하는 사용자를 찾을 수 없습니다."
    );
  }
};
export const fetchBoardList = async (page, size, title) => {
  try {
    console.log("axios title : ", title);
    const response = await api.get("/board/list", {
      params: { page, size, title },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "게시글 리스트를 가져오는데 실패했습니다. 다시 시도해주세요."
    );
  }
};

export const fetchBoardDetail = async (title, nickname, profile) => {
  try {
    const response = await api.get("/board/detail", {
      params: { title, nickname, profile },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.boardDTOS[0]; // 첫 번째 게시글 반환
  } catch (error) {
    throw new Error(
      "게시글 상세 정보를 가져오는데 실패했습니다. 다시 시도해주세요."
    );
  }
};

export const createBoard = async (title, content) => {
  try {
    console.log(
      "create axios 타이밍의 token : " + localStorage.getItem("accessToken")
    );
    const response = await api.post(
      "/board/save",
      { title, content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("게시글 작성에 실패했습니다. 다시 시도해주세요.");
  }
};

// 게시글 삭제 함수
export const deleteBoard = async (boardId) => {
  try {
    const response = await api.delete(`/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "게시글 삭제에 실패했습니다. 다시 시도해주세요.");
  }
};
export const fetchBoardSearch = async (keyword, type, page, size) => {
  try {
    const response = await api.get("/board/search", {
      params: { keyword, type, page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "게시글 검색에 실패했습니다. 다시 시도해주세요.");
  }
};

export const fetchComments = async (boardDTO) => {
  console.log("API: Fetching comments for board:", boardDTO);
  try {
    const response = await api.post("/comment/show", boardDTO, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("API: Fetch comments response:", response);
    return response.data;
  } catch (error) {
    console.error("API: Error fetching comments:", error);
    handleAxiosError(error, "댓글을 불러오는데 실패했습니다.");
  }
};

export const saveComment = async (commentDTO) => {
  try {
    const response = await api.post("/comment/save", commentDTO, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "API: Error saving comment:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "댓글을 저장하는데 실패했습니다."
    );
  }
};

export const deleteComment = async (commentDTO) => {
  try {
    const response = await api.post("/comment/del", commentDTO, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteComment API call:", error);
    handleAxiosError(error, "댓글을 삭제하는데 실패했습니다.");
  }
};

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

export const createJobApplication = async (hiringDTO) => {
  try {
    console.log(hiringDTO);
    const response = await api.post(
      "/send/save",
      { hiringDTO },
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
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching received applications:",
      error.response?.data || error.message
    );
    throw new Error("받은 신청 목록을 불러오는데 실패했습니다.");
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
