import React, { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import DeleteButton from "./DeleteButton";
import "./BoardDetail.css";

/**
 * 게시글 상세 페이지를 표시하는 컴포넌트
 * @param {Object} props
 * @param {Object} props.boardContent - 게시글 내용 객체
 */
function BoardDetail({ boardContent }) {
  // 게시글 상태
  const [board, setBoard] = useState(null);
  // 댓글 수 상태
  const [commentCount, setCommentCount] = useState(0);

  // boardContent prop이 변경될 때마다 board 상태 업데이트
  useEffect(() => {
    setBoard(boardContent);
  }, [boardContent]);

  /**
   * 댓글 수 업데이트 핸들러
   * @param {number} count - 새로운 댓글 수
   */
  const handleCommentCountUpdate = (count) => {
    setCommentCount(count);
  };

  // 게시글 로딩 중 표시
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
            {/* 게시글 삭제 버튼 */}
            <DeleteButton boardId={board.id} nickname={board.nickname} />
          </div>
          <div className="board-content">{board.content}</div>
        </div>
        {/* 댓글 컴포넌트 */}
        <Comments
          boardId={board.id}
          onCommentCountUpdate={handleCommentCountUpdate}
        />
      </div>
    </div>
  );
}

export default BoardDetail;
