import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import { useMediaQuery } from "react-responsive";
import NavBar from "../Navbar/NavBar";
import "./BoardList.css"; // 스타일링을 위한 CSS 파일
import { fetchBoardList, requestRefreshToken } from "../../api/Api";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    fetchBoards(page, size);
  }, [page, size]);

  const fetchBoards = useCallback(async (page, size) => {
    setLoading(true);
    try {
      const data = await fetchBoardList(page, size);
      setBoards((prevBoards) =>
        page === 0 ? data.content : [...prevBoards, ...data.content]
      );
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

  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
    setSize(10);
  };

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 2 &&
          !loading
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, loading]);

  return (
    <div className="board-list">
      <NavBar /> {/* NavBar 추가 */}
      <div className="board-items">
        {boards.map((board) => (
          <div key={board.id} className="board-item">
            <h3 className="board-title">{board.title}</h3>
            <p className="board-content">{board.content}</p>
            <p className="board-author">작성자: {board.nickname}</p>
          </div>
        ))}
      </div>
      {isMobile ? (
        loading && <p>Loading...</p>
      ) : (
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default BoardList;
