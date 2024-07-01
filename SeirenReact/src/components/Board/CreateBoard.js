import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function CreateBoard() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const changeTitle = (event) => setTitle(event.target.value);
  const changeContent = (event) => setContent(event.target.value);

  const createBbs = async () => {
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다!");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }

    const req = {
      id: auth,
      title: title,
      content: content,
    };

    await axios
      .post("http://localhost:3000/bbs", req, {
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
          <div className="form-group">
            <label>작성자</label>
            <input
              type="text"
              className="form-control"
              value={localStorage.getItem("id")}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={changeTitle}
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              className="form-control"
              value={content}
              onChange={changeContent}
              rows="10"
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
