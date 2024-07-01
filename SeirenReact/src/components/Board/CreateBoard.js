import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../api/Api";
import "./CreateBoard.css";

function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") || ""
  );
  const [profile, setProfile] = useState(localStorage.getItem("profile") || "");

  const handleChange = (setter, maxLen) => (event) => {
    if (event.target.value.length <= maxLen) {
      setter(event.target.value);
    } else {
      alert(`최대 ${maxLen}자까지 입력 가능합니다.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다!");
      navigate("/login");
      return;
    }

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
      <div className="create-board">
        <h2 className="form-title">게시글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            {profile && (
              <img src={profile} alt="Profile" className="profile-image" />
            )}
            <span className="nickname">{nickname}</span>
          </div>
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
