import React, { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import "./BoardDetail.css";

function BoardDetail({ boardContent }) {
  const [board, setBoard] = useState(null);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    setBoard(boardContent);
  }, [boardContent]);

  const handleCommentCountUpdate = (count) => {
    setCommentCount(count);
  };

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
        <Comments
          boardId={board.id}
          onCommentCountUpdate={handleCommentCountUpdate}
        />
      </div>
    </div>
  );
}

export default BoardDetail;
