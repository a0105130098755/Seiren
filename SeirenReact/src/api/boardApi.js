import api, { handleAxiosError } from "./Api";

export const fetchBoardList = async (page, size, title) => {
  try {
    console.log("API 호출 파라미터:", { page, size, title });
    const response = await api.get("/board/list", {
      params: { page, size, title },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("API 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("fetchBoardList 에러:", error);
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
