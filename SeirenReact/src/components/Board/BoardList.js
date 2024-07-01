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
  const [profile, setProfile] = useState({
    image: localStorage.getItem("profileImage"),
    nickname: localStorage.getItem("nickname"),
  });

  const fetchBoards = useCallback(async (page = 0, size = 15) => {
    try {
      setIsFetching(true);
      const response = await fetchBoardList(page, size);
      if (response) {
        setBbsList((prevBbsList) => [
          ...prevBbsList,
          ...(response.bbsList || []),
        ]);
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
      const response = await fetchBoardSearch(searchKeyword, "title", 0, 15);
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
    fetchBoards(0, 15);
  }, [fetchBoards]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (page > 0) {
      fetchBoards(page, 15);
    }
  }, [page, fetchBoards]);

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

          {totalCnt > 0 && !isFetching && (
            <Pagination
              className="pagination"
              activePage={page + 1}
              itemsCountPerPage={15}
              totalItemsCount={totalCnt}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={(pageNumber) => {
                setPage(pageNumber - 1);
                fetchBoards(pageNumber - 1, 15);
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
