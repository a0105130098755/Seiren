// DeleteButton.js
import React from "react";
import { deleteBoard } from "../../api/boardApi";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

/**
 * 게시글 삭제 버튼 컴포넌트
 * @param {Object} props
 * @param {number} props.boardId - 삭제할 게시글의 ID
 * @param {string} props.nickname - 게시글 작성자의 닉네임
 */
function DeleteButton({ boardId, nickname }) {
  const navigate = useNavigate();

  // 암호화된 닉네임 복호화
  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  );
  const currentUserNickname = bytes.toString(CryptoJS.enc.Utf8);

  /**
   * 게시글 삭제 핸들러
   * 사용자 확인 후 게시글을 삭제하고 게시판 목록으로 이동
   */
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

  // 현재 사용자가 게시글 작성자가 아니면 삭제 버튼을 렌더링하지 않음
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
