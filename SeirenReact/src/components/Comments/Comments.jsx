import React, { useState, useEffect, useCallback } from "react";
import { fetchComments, saveComment, deleteComment } from "../../api/boardApi";
import "./Comments.css";
import CryptoJS from "crypto-js";

/**
 * 댓글 컴포넌트
 * @param {Object} props
 * @param {number} props.boardId - 게시글 ID
 * @param {Function} props.onCommentCountUpdate - 댓글 수 업데이트 콜백 함수
 */
const Comments = ({ boardId, onCommentCountUpdate }) => {
  // 댓글 목록 상태
  const [comments, setComments] = useState([]);
  // 새 댓글 입력 상태
  const [newComment, setNewComment] = useState("");
  // 에러 메시지 상태
  const [error, setError] = useState(null);

  // 암호화된 사용자 닉네임 복호화
  const userNickname = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  /**
   * 댓글 목록을 불러오는 함수
   */
  const loadComments = useCallback(async () => {
    try {
      const boardDTO = { id: boardId };
      const data = await fetchComments(boardDTO);
      const commentList = data || [];
      setComments(commentList);
      onCommentCountUpdate?.(commentList.length);
    } catch (error) {
      console.error("Error loading comments:", error);
      setError("댓글을 불러오는데 실패했습니다.");
      setComments([]);
      onCommentCountUpdate?.(0);
    }
  }, [boardId, onCommentCountUpdate]);

  // 컴포넌트 마운트 시 댓글 목록 불러오기
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  /**
   * 새 댓글 저장 핸들러
   */
  const handleSaveComment = async () => {
    try {
      const commentDTO = {
        boardDTO: { id: boardId },
        nickname: userNickname,
        content: newComment,
      };
      const response = await saveComment(commentDTO);
      if (response === true) {
        setNewComment("");
        loadComments();
        setError(null);
      } else {
        setError("댓글 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      setError("댓글 저장에 실패했습니다.");
    }
  };

  /**
   * 댓글 삭제 핸들러
   * @param {number} commentId - 삭제할 댓글 ID
   * @param {string} commentNickname - 댓글 작성자 닉네임
   */
  const handleDeleteComment = async (commentId, commentNickname) => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) return;
    if (userNickname !== commentNickname) {
      setError("자신의 댓글만 삭제할 수 있습니다.");
      return;
    }

    try {
      const commentDTO = { id: commentId, nickname: userNickname };
      const response = await deleteComment(commentDTO);
      if (response === true) {
        loadComments();
        setError(null);
      } else {
        setError("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="comments-section">
      <h3>댓글 ({comments.length})</h3>
      {error && <div className="error-message">{error}</div>}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                {comment.content} - {comment.nickname}
              </p>
              {userNickname === comment.nickname && (
                <button
                  onClick={() =>
                    handleDeleteComment(comment.id, comment.nickname)
                  }
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-comments">
          아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
        </div>
      )}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleSaveComment}>댓글 작성</button>
      </div>
    </div>
  );
};

export default Comments;
