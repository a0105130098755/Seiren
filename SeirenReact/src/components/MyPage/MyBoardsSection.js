import React, { useState, useEffect } from "react";
import { fetchBoardList } from "../../api/Api";
import CryptoJS from "crypto-js";
import {
  List,
  ListItem,
  ListItemTitle,
  ListItemContent,
  ListItemDate,
} from "./MyPageStyles";

const MyBoardsSection = () => {
  const [boards, setBoards] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBoards = async () => {
      setLoading(true);
      setError(null);
      try {
        const encryptedNickname = localStorage.getItem("nickname");
        if (!encryptedNickname) {
          throw new Error("사용자 정보를 찾을 수 없습니다.");
        }

        const bytes = CryptoJS.AES.decrypt(
          encryptedNickname,
          process.env.REACT_APP_SECRET_KEY
        );
        const nickname = bytes.toString(CryptoJS.enc.Utf8);

        if (!nickname) {
          throw new Error("닉네임을 복호화할 수 없습니다.");
        }

        const response = await fetchBoardList(0, 1000, nickname);

        setBoards(response.boardDTOS || []);
      } catch (err) {
        setError(err.message || "내 게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      {boards.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <List>
          {boards.map((board) => (
            <ListItem key={board.id}>
              <ListItemTitle>{board.title}</ListItemTitle>
              <ListItemDate>
                {new Date(board.regDate).toLocaleDateString()}
              </ListItemDate>
              <ListItemContent>
                {board.content?.substring(0, 100)}...
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyBoardsSection;
