import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchBoardList, fetchBoardSearch } from "../../api/Api";
import Pagination from "./Pagination";
import BoardCard from "./BoardCard";
import "./BoardList.css";

function BoardList() {
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("");

  const fetchBoards = useCallback(async (page, size) => {
    try {
      setIsFetching(true);
      const response = await fetchBoardList(page, size);
      if (response) {
        setBbsList(response.bbsList || []);
        setTotalCnt(response.pageCnt || 0);
      } else {
        setBbsList([]);
        setTotalCnt(0);
      }
      setIsFetching(false);
    } catch (error) {
      console.error("게시글 리스트를 가져오는데 실패했습니다.", error);
      setIsFetching(false);
    }
  }, []);

  const handleSearch = async () => {
    try {
      setIsFetching(true);
      const response = await fetchBoardSearch(searchKeyword, searchType, 0, 10);
      if (response) {
        setBbsList(response.bbsList || []);
        setTotalCnt(response.pageCnt || 0);
      } else {
        setBbsList([]);
        setTotalCnt(0);
      }
      setIsFetching(false);
    } catch (error) {
      console.error("검색 결과를 가져오는데 실패했습니다.", error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBoards(0, 10);
  }, [fetchBoards]);

  return (
    <div className="board-page">
      <div className="board-container">
        <div className="board-header sticky-header">
          <h1 className="board-title">게시판</h1>
          <div className="search-container">
            <select
              className="custom-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">검색 옵션 선택</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </select>
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
              disabled={isFetching}
            >
              검색
            </button>
          </div>
        </div>

        <div className="board-content">
          <div className="board-list">
            {bbsList.length > 0 ? (
              bbsList.map((bbs, idx) => (
                <BoardCard
                  key={idx}
                  title={bbs.title}
                  content={bbs.content}
                  writer={bbs.writer}
                />
              ))
            ) : (
              <div className="no-posts">게시글이 없습니다.</div>
            )}
          </div>

          {totalCnt > 0 && (
            <Pagination
              className="pagination"
              activePage={page + 1}
              itemsCountPerPage={10}
              totalItemsCount={totalCnt}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={(pageNumber) => {
                setPage(pageNumber - 1);
                fetchBoards(pageNumber - 1, 10);
              }}
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
