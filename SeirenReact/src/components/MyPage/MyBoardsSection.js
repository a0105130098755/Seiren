import React, { useState, useEffect } from "react";
import { fetchBoardList } from "../../api/Api";

const MyBoardsSection = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const nickname = localStorage.getItem("nickname");
        const response = await fetchBoardList(0, 1000, nickname);
        setBoards(response.boardDTOS);
      } catch (err) {
        setError("내 게시글을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h2>내 게시글</h2>
      {boards.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        boards.map((board) => (
          <div key={board.id}>
            <h3>{board.title}</h3>
            <p>{board.content.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBoardsSection;
