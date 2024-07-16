import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../api/boardApi";
import "./CreateBoard.css";
import CryptoJS from "crypto-js";
import BackButton from "../BackButton";

/**
 * 새 게시글 작성 컴포넌트
 */
function CreateBoard() {
  const navigate = useNavigate();
  // 게시글 제목 상태
  const [title, setTitle] = useState("");
  // 게시글 내용 상태
  const [content, setContent] = useState("");

  // 암호화된 닉네임 복호화
  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  );
  const currentNickname = bytes.toString(CryptoJS.enc.Utf8);

  // 프로필 이미지 상태
  const [profile, setProfile] = useState(localStorage.getItem("profile") || "");

  /**
   * 입력 필드 변경 핸들러
   * @param {Function} setter - 상태 설정 함수
   * @param {number} maxLen - 최대 입력 길이
   * @returns {Function} 이벤트 핸들러 함수
   */
  const handleChange = (setter, maxLen) => (event) => {
    if (event.target.value.length <= maxLen) {
      setter(event.target.value);
    } else {
      alert(`최대 ${maxLen}자까지 입력 가능합니다.`);
    }
  };

  /**
   * 폼 제출 핸들러
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    // 로그인 상태 확인
    if (!accessToken) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다!");
      navigate("/login");
      return;
    }

    // 입력 필드 유효성 검사
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await createBoard(title, content);
      alert("새로운 게시글을 성공적으로 등록했습니다 :D");
      navigate(`/bbsdetail/${response.seq}`);
    } catch (err) {
      console.error("게시글 작성에 실패했습니다.", err);
    }
  };

  return (
    <div className="create-board-container">
      <BackButton className="back-button" />
      <div className="create-board">
        <h2 className="form-title">게시글 작성</h2>
        <form onSubmit={handleSubmit}>
          {/* 프로필 섹션 */}
          <div className="profile-section">
            {profile && (
              <img src={profile} alt="Profile" className="profile-image" />
            )}
            <span className="nickname">{currentNickname}</span>{" "}
          </div>
          {/* 제목 입력 필드 */}
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={handleChange(setTitle, 100)}
              required
            />
          </div>
          {/* 내용 입력 필드 */}
          <div className="form-group">
            <label>내용</label>
            <textarea
              className="form-control"
              value={content}
              onChange={handleChange(setContent, 500)}
              rows="10"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-pen"></i> 등록하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBoard;
