import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useMediaQuery } from "react-responsive";
import "./BoardList.css";
import { fetchBoardList, requestRefreshToken } from "../../api/Api";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const fetchBoards = useCallback(async (page, size) => {
    setLoading(true);
    try {
      const data = await fetchBoardList(page, size);
      setBoards(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      if (error.message.includes("401")) {
        await requestRefreshToken();
        fetchBoards(page, size);
      } else {
        console.error(error);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchBoards(page, size);
  }, [page, size, fetchBoards]);

  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
    setSize(10);
  };

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate("/board/create");
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="header">게시판</div>
      <div className="board-list">
        <table className="board-table">
          <thead>
            <tr>
              <th>작성자</th>
              <th>제목</th>
              <th>날짜</th>
              <th>조회수</th>
              {isLoggedIn && <th>수정</th>}
            </tr>
          </thead>
          <tbody>
            {loading && boards.length === 0 ? (
              <tr>
                <td colSpan={isLoggedIn ? "5" : "4"} className="loading">
                  Loading...
                </td>
              </tr>
            ) : boards.length === 0 ? (
              <tr>
                <td colSpan={isLoggedIn ? "5" : "4"} className="no-boards">
                  아직 게시글이 없습니다
                </td>
              </tr>
            ) : (
              boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.nickname}</td>
                  <td>{board.title}</td>
                  <td>{new Date(board.regDate).toLocaleDateString()}</td>
                  <td>{board.viewCount}</td>
                  {isLoggedIn && (
                    <td>
                      <button
                        onClick={() => navigate(`/board/edit/${board.id}`)}
                      >
                        수정
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="pagination"
        />
        <button onClick={handleCreateClick} className="create-button">
          글 작성
        </button>
      </div>
    </div>
  );
}

export default BoardList;
