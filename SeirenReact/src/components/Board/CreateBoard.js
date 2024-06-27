import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../api/Api";
import "./CreateBoard.css";

function CreateBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBoard({ title, content });
      navigate("/board");
    } catch (error) {
      console.error("게시글 작성에 실패했습니다.", error);
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
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default CreateBoard;
