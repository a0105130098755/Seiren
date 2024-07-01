import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function CreateBoard() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedNickname) setNickname(storedNickname);
    if (storedProfileImage) setProfileImage(storedProfileImage);
  }, []);

  const changeTitle = (event) => setTitle(event.target.value);
  const changeContent = (event) => setContent(event.target.value);

  const createBbs = async () => {
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다!");
      navigate("/login");
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
      id: auth,
      title: title,
      content: content,
    };

    await axios
      .post("http://localhost:3000/board/save", req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        console.log("[BbsWrite.js] createBbs() success :D");
        console.log(resp.data);
        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/bbsdetail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[BbsWrite.js] createBbs() error :<");
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
            {profileImage && (
              <img src={profileImage} alt="Profile" className="profile-image" />
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
