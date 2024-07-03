// DeleteButton.js
import React from "react";
import { deleteBoard } from "../../api/Api";
import { useNavigate } from "react-router-dom";

function DeleteButton({ boardId, nickname }) {
  const navigate = useNavigate();
  const currentUserNickname = localStorage.getItem("nickname");

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoard(boardId);
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/board");
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (nickname !== currentUserNickname) {
    return null;
  }

  return (
    <button onClick={handleDelete} className="delete-button">
      삭제
    </button>
  );
}

export default DeleteButton;
