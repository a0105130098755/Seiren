import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBoard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedProfile = localStorage.getItem("profile");

    if (storedNickname) setNickname(storedNickname);
    if (storedProfile) setProfile(storedProfile);
  }, []);

  const changeTitle = (event) => {
    if (event.target.value.length <= 100) {
      setTitle(event.target.value);
    } else {
      alert("제목은 최대 100자까지 입력 가능합니다.");
    }
  };

  const changeContent = (event) => {
    if (event.target.value.length <= 500) {
      setContent(event.target.value);
    } else {
      alert("내용은 최대 500자까지 입력 가능합니다.");
    }
  };

  const createBbs = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다!");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }

    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const req = {
      title: title,
      content: content,
    };

    await axios
      .post("http://localhost:3000/board/save", req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => {
        console.log("[CreateBoard.js] createBbs() success :D");
        console.log(resp.data);
        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/bbsdetail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[CreateBoard.js] createBbs() error :<");
        console.log(err);
      });
  };

  return (
    <div className="create-board-container">
      <div className="create-board">
        <h2 className="form-title">게시글 작성</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createBbs();
          }}
        >
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
              onChange={changeTitle}
              required
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              className="form-control"
              value={content}
              onChange={changeContent}
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
