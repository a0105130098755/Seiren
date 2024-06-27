import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBoardDetail, updateBoard } from "../../api/Api";
import "./CreateBoard.css";

function EditBoard() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const fetchBoard = async () => {
        try {
          const board = await fetchBoardDetail(id);
          setTitle(board.title);
          setContent(board.content);
        } catch (error) {
          console.error("게시글을 불러오는데 실패했습니다.", error);
        }
      };
      fetchBoard();
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBoard(id, { title, content });
      navigate("/board");
    } catch (error) {
      console.error("게시글 수정에 실패했습니다.", error);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="create-board">
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default EditBoard;
