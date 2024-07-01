import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBoardDetail, fetchComments } from "../../api/Api";
import "./BoardDetail.css";

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        const response = await fetchBoardDetail(id);
        setBoard(response);
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는데 실패했습니다.", error);
      }
    };
    getBoardDetail();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsFetching(true);
        const response = await fetchComments(id, page, 10);
        setComments((prevComments) => [
          ...prevComments,
          ...(response.comments || []),
        ]);
        setIsFetching(false);
      } catch (error) {
        console.error("댓글을 가져오는데 실패했습니다.", error);
        setIsFetching(false);
      }
    };
    getComments();
  }, [id, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  if (!board) return <div>Loading...</div>;

  return (
    <div className="board-detail-page">
      <div className="board-detail-container">
        <h1 className="board-detail-title">{board.title}</h1>
        <div className="board-detail-meta">
          <span className="board-detail-nickname">
            작성자: {board.nickname}
          </span>
          <span className="board-detail-location">위치: {board.location}</span>
          <span className="board-detail-date">
            작성일: {new Date(board.regDate).toLocaleDateString()}
          </span>
        </div>
        <p className="board-detail-content">{board.content}</p>
        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((comment, idx) => (
              <div className="comment" key={idx}>
                <p className="comment-nickname">{comment.nickname}</p>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="no-comments">댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
