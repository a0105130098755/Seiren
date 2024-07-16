import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchBoardList } from "../../api/boardApi";
import Pagination from "./BoardPagination";
import BoardCard from "./BoardCard";
import BackButton from "../BackButton";
import "./BoardList.css";

/**
 * 게시판 목록을 표시하는 컴포넌트
 * @param {Object} props
 * @param {Object} props.board - 현재 선택된 게시글
 * @param {Function} props.setBoard - 선택된 게시글을 설정하는 함수
 */
function BoardList({ board, setBoard }) {
  // 게시글 목록 상태
  const [bbsList, setBbsList] = useState([]);
  // 전체 페이지 수 상태
  const [totalPages, setTotalPages] = useState(0);
  // 현재 페이지 상태
  const [page, setPage] = useState(0);
  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState("");
  // 페이지당 게시글 수
  const size = 9;

  /**
   * 게시글 목록을 가져오는 함수
   * @param {number} page - 페이지 번호
   */
  const fetchBoards = useCallback(
    async (page = 0) => {
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
    },
    [searchKeyword]
  );

  // 페이지나 검색어가 변경될 때마다 게시글 목록 갱신
  useEffect(() => {
    fetchBoards(page);
  }, [page, searchKeyword, fetchBoards]);

  /**
   * 검색 버튼 클릭 핸들러
   */
  const handleSearch = () => {
    setPage(0);
    fetchBoards(0);
  };

  return (
    <div className="board-page">
      <div className="board-container">
        {/* 게시판 헤더 */}
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

        {/* 게시글 목록 */}
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

          {/* 페이지네이션 */}
          {totalPages > 0 && (
            <Pagination
              className="pagination"
              activePage={page + 1}
              itemsCountPerPage={size}
              totalItemsCount={totalPages * size}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={(pageNumber) => setPage(pageNumber - 1)}
            />
          )}
        </div>

        {/* 글쓰기 버튼 */}
        <div className="write-button-container">
          <Link className="btn btn-write" to="/board/create">
            <i className="fas fa-pen"></i> &nbsp;글쓰기
          </Link>
        </div>
        <BackButton />
      </div>
    </div>
  );
}

export default BoardList;
