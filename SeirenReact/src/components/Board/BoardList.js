import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { fetchBoardList } from "../../api/Api";
import BoardCard from "./BoardCard";
import "./BoardList.css";

function BoardList() {
  const [bbsList, setBbsList] = useState([]);
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const navigate = useNavigate();

  const getBbsList = async (choice, search, page) => {
    try {
      const response = await fetchBoardList(page, 10);
      setBbsList(response.bbsList);
      setTotalCnt(response.pageCnt);
    } catch (error) {
      console.error("게시글 리스트를 가져오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    getBbsList("", "", 0);
  }, []);

  const changeChoice = (event) => setChoiceVal(event.target.value);
  const changeSearch = (event) => setSearchVal(event.target.value);
  const search = () => {
    getBbsList(choiceVal, searchVal, 0);
  };

  const changePage = (page) => {
    setPage(page);
    getBbsList(choiceVal, searchVal, page - 1);
  };

  return (
    <div className="board-page">
      <div className="board-container">
        <div className="board-header sticky-header">
          <h1 className="board-title">게시판</h1>
          <div className="search-container">
            <select
              className="custom-select"
              value={choiceVal}
              onChange={changeChoice}
            >
              <option>검색 옵션 선택</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="검색어"
              value={searchVal}
              onChange={changeSearch}
            />
            <button type="button" className="btn btn-search" onClick={search}>
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
              onChange={changePage}
            />
          )}
        </div>

        <div className="write-button-container">
          <Link className="btn btn-outline-secondary" to="/bbswrite">
            <i className="fas fa-pen"></i> &nbsp; 글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
