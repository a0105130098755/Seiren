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

export const requestRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/reissued", { refreshToken });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "토큰 재발행에 실패했습니다. 다시 시도해주세요.");
  }
};

// 카카오 로그인 관련 API 함수 추가
export const loginWithKakao = async (code) => {
  try {
    const response = await api.post("/kakao/login", { code });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "카카오 로그인에 실패했습니다. 다시 시도해주세요.");
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

export const fetchBoardDetail = async (id) => {
  try {
    const response = await api.get(`/board/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "게시글 상세 정보를 가져오는데 실패했습니다. 다시 시도해주세요."
    );
  }
};

// 게시글 작성 함수
export const createBoard = async (boardData) => {
  try {
    const response = await api.post("/board", boardData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "게시글 작성에 실패했습니다. 다시 시도해주세요.");
  }
};

// 게시글 수정 함수
export const updateBoard = async (boardId, boardData) => {
  try {
    const response = await api.put(`/board/${boardId}`, boardData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "게시글 수정에 실패했습니다. 다시 시도해주세요.");
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
