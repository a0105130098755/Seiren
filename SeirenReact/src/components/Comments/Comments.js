import React, { useState, useEffect } from "react";
import { fetchComments, saveComment, deleteComment } from "../../api/Api";
import "./Comments.css";

const Comments = ({ boardId, onCommentCountUpdate }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const userNickname = localStorage.getItem("nickname");

  useEffect(() => {
    loadComments();
  }, [boardId]);

  const loadComments = async () => {
    try {
      const boardDTO = { id: boardId };
      const data = await fetchComments(boardDTO);
      const commentList = Array.isArray(data) ? data : [];
      setComments(commentList);
      if (typeof onCommentCountUpdate === "function") {
        onCommentCountUpdate(commentList.length);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      setError("댓글을 불러오는데 실패했습니다.");
      setComments([]);
      if (typeof onCommentCountUpdate === "function") {
        onCommentCountUpdate(0);
      }
    }
  };

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
        await loadComments();
        setError(null);
      } else {
        setError("댓글 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      setError("댓글 저장에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId, commentNickname) => {
    if (userNickname !== commentNickname) {
      setError("자신의 댓글만 삭제할 수 있습니다.");
      return;
    }

    try {
      const commentDTO = {
        id: commentId,
        nickname: userNickname,
      };
      const response = await deleteComment(commentDTO);
      if (response === true) {
        await loadComments();
        setError(null);
      } else {
        setError("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("댓글 삭제에 실패했습니다.");
    }
  };

  console.log("Current user nickname:", userNickname);

  return (
    <div className="comments-section">
      <h3>댓글 ({comments.length})</h3>
      {error && <div className="error-message">{error}</div>}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <p>
                {comment.content} - {comment.nickname}
              </p>
              <button
                className={
                  userNickname === comment.nickname ? "active" : "inactive"
                }
                onClick={() =>
                  handleDeleteComment(comment.id, comment.nickname)
                }
                disabled={userNickname !== comment.nickname}
              >
                삭제
              </button>
              {console.log(
                `User Nickname: ${userNickname}, Comment Nickname: ${comment.nickname}`
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
