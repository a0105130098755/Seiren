import api, { handleAxiosError } from "./Api";

/**
 * 게시글 목록을 가져옵니다.
 * @param {number} page 페이지 번호
 * @param {number} size 페이지당 게시글 수
 * @param {string} title 검색할 제목 (선택적)
 * @returns {Promise<Object>} 게시글 목록 데이터
 * @throws {Error} 게시글 목록 조회 실패 시 에러
 */
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

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param {string} title 게시글 제목
 * @param {string} nickname 작성자 닉네임
 * @param {string} profile 프로필 정보
 * @returns {Promise<Object>} 게시글 상세 정보
 * @throws {Error} 게시글 상세 정보 조회 실패 시 에러
 */
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

/**
 * 새 게시글을 작성합니다.
 * @param {string} title 게시글 제목
 * @param {string} content 게시글 내용
 * @returns {Promise<Object>} 생성된 게시글 정보
 * @throws {Error} 게시글 작성 실패 시 에러
 */
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

/**
 * 게시글을 삭제합니다.
 * @param {number} boardId 삭제할 게시글의 ID
 * @returns {Promise<Object>} 삭제 결과
 * @throws {Error} 게시글 삭제 실패 시 에러
 */
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

/**
 * 게시글을 검색합니다.
 * @param {string} keyword 검색 키워드
 * @param {string} type 검색 유형
 * @param {number} page 페이지 번호
 * @param {number} size 페이지당 게시글 수
 * @returns {Promise<Object>} 검색 결과
 * @throws {Error} 게시글 검색 실패 시 에러
 */
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

/**
 * 특정 게시글의 댓글을 가져옵니다.
 * @param {Object} boardDTO 게시글 정보
 * @returns {Promise<Array>} 댓글 목록
 * @throws {Error} 댓글 조회 실패 시 에러
 */
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

/**
 * 새 댓글을 저장합니다.
 * @param {Object} commentDTO 저장할 댓글 정보
 * @returns {Promise<Object>} 저장된 댓글 정보
 * @throws {Error} 댓글 저장 실패 시 에러
 */
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

/**
 * 댓글을 삭제합니다.
 * @param {Object} commentDTO 삭제할 댓글 정보
 * @returns {Promise<Object>} 삭제 결과
 * @throws {Error} 댓글 삭제 실패 시 에러
 */
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
