import React, { useState, useEffect } from "react";
import { fetchBoardList } from "../../api/Api";
import CryptoJS from "crypto-js";
import {
  List,
  ListItem,
  ListItemTitle,
  ListItemContent,
  ListItemDate,
  ProfileImage,
} from "./MyPageStyles";

const MyBoardsSection = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState([]);
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

        console.log("Decrypted nickname:", nickname); // 디버깅용

        const response = await fetchBoardList(0, 1000, nickname);
        console.log("API response:", response); // 디버깅용

        if (response && response.boardDTOS) {
          setBoards(response.boardDTOS);
        } else {
          setBoards([]);
          console.log("No boards found or unexpected response structure");
        }
      } catch (err) {
        console.error("Error in loadBoards:", err);
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
              <ProfileImage src={board.profile} alt="프로필" />
              <div>
                <ListItemTitle>{board.title}</ListItemTitle>
                <ListItemDate>
                  {new Date(board.regDate).toLocaleDateString()}
                </ListItemDate>
                <ListItemContent>
                  {board.content
                    ? board.content.substring(0, 100) + "..."
                    : "내용 없음"}
                </ListItemContent>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyBoardsSection;
