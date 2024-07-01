import React, { useState, useEffect } from "react";
import "./BoardDetail.css";

function BoardDetail({ boardContent }) {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    setBoard(boardContent);
  }, [boardContent]);

  if (!board) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  console.log("Rendering board detail:", board);

  return (
    <div className="board-detail-page">
      <div className="board-detail-container">
        <div className="board-detail">
          <h2 className="board-title">{board.title}</h2>
          <div className="board-info">
            <img src={board.profile} alt="Profile" className="profile-image" />
            <div>
              <span className="board-nickname">{board.nickname}</span>
              <span className="board-date">
                {new Date(board.regDate).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="board-content">{board.content}</div>
        </div>
        <div className="comments-section">
          <h3>댓글</h3>
          <div className="no-comments">댓글이 없습니다.</div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
