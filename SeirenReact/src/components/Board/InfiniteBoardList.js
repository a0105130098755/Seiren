import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { fetchBoardList, requestRefreshToken } from "../api/api";

function InfiniteBoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBoards = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchBoardList(page, 10);
      setBoards((prevBoards) => [...prevBoards, ...response.bbsList]);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await requestRefreshToken();
        fetchBoards();
      } else {
        console.error(error);
        setLoading(false);
      }
    }
  }, [page]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      {boards.map((board) => (
        <div key={board.id}>
          <h3>{board.title}</h3>
          <p>{board.content}</p>
          <p>작성자: {board.writer}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteBoardList;
