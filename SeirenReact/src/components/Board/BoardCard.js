import React from "react";
import "./BoardCard.css";

function BoardCard({ title, content, writer }) {
  return (
    <div className="board-card">
      <h3 className="board-card-title">{title}</h3>
      <p className="board-card-content">{content}</p>
      <p className="board-card-writer">작성자: {writer}</p>
    </div>
  );
}

export default BoardCard;
