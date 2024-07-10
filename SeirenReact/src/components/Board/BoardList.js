import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBoardList } from "../../api/Api";
import Pagination from "./BoardPagination";
import BoardCard from "./BoardCard";
import "./BoardList.css";

function BoardList({ board, setBoard }) {
  const [bbsList, setBbsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [profile, setProfile] = useState({
    image: localStorage.getItem("profile"),
    nickname: localStorage.getItem("nickname"),
  });
  const size = 9; // 페이지 사이즈를 변수로 정의

  useEffect(() => {
    const fetchBoards = async (page = 0) => {
      try {
        const response = await fetchBoardList(page, size, searchKeyword);
        if (response.boardDTOS) {
          setBbsList(response.boardDTOS);
          setTotalPages(response.size);
        } else {
          setBbsList([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("게시글 리스트를 가져오는데 실패했습니다.", error);
      }
    };

    fetchBoards(page);
  }, [page]);

  const handleSearch = async () => {
    setPage(0);
    if (searchKeyword === "") {
      fetchBoards(0);
      return;
    }
    try {
      const response = await fetchBoardList(0, size, searchKeyword);
      if (response.boardDTOS) {
        setBbsList(response.boardDTOS);
        setTotalPages(response.totalPages);
      } else {
        setBbsList([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("게시글 리스트를 가져오는데 실패했습니다.", error);
    }
  };

  return (
    <div className="board-page">
      <div className="board-container">
        <div className="board-header sticky-header">
          <h1 className="board-title">게시판</h1>
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="검색어"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-search"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
        </div>

        <div className="board-content">
          <div className="board-list">
            {bbsList.length > 0 ? (
              bbsList.map((bbs, idx) => (
                <Link
                  to={`/board/details`}
                  key={idx}
                  className="board-card-link"
                  onClick={() => setBoard(bbs)}
                >
                  <BoardCard title={bbs.title} writer={bbs.nickname} />
                </Link>
              ))
            ) : (
              <div className="no-posts">게시글이 없습니다.</div>
            )}
          </div>

          {totalPages > 0 && (
            <Pagination
              className="pagination"
              activePage={page + 1}
              itemsCountPerPage={size}
              totalItemsCount={totalPages * size} // 총 게시물 수 계산
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={(pageNumber) => setPage(pageNumber - 1)}
            />
          )}
        </div>

        <div className="write-button-container">
          <Link className="btn btn-write" to="/board/create">
            <i className="fas fa-pen"></i> &nbsp; 글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
