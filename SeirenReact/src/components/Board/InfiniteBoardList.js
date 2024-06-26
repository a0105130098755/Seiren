import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function InfiniteBoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBoards = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/board/list", {
        params: { page, size: 10 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBoards((prevBoards) => [...prevBoards, ...response.data.content]);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
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

  const requestRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("/auth/reissued", { refreshToken });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      console.error("토큰 재발행에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {boards.map((board) => (
        <div key={board.id}>
          <h3>{board.title}</h3>
          <p>{board.content}</p>
          <p>작성자: {board.nickname}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteBoardList;
