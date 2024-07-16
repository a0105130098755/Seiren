import React, { useState, useEffect } from "react";
import { fetchBoardList } from "../../api/boardApi";
import CryptoJS from "crypto-js";
import {
  ContentSection,
  SectionTitle,
  List,
  ListItem,
  ListItemTitle,
  ListItemContent,
  ListItemDate,
  ProfileImage,
} from "./MyPageStyles";

// MyBoardsSection 컴포넌트: 사용자가 작성한 게시글 목록을 표시
const MyBoardsSection = () => {
  // 상태 관리
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 사용자 닉네임 복호화 함수
    const loadUserNickname = async () => {
      try {
        const encryptedNickname = localStorage.getItem("nickname");
        if (encryptedNickname) {
          const bytes = CryptoJS.AES.decrypt(
            encryptedNickname,
            process.env.REACT_APP_SECRET_KEY
          );
          const decryptedNickname = bytes.toString(CryptoJS.enc.Utf8).trim();
          setNickname(decryptedNickname);
        }
      } catch (err) {
        console.error("사용자 닉네임을 불러오는 데 실패했습니다.", err);
        // TODO: 사용자에게 오류 알림
      }
    };

    // 게시글 목록 불러오기 함수
    const loadBoards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBoardList(0, 10, ""); // 첫 페이지, 10개씩, 필터 없음
        console.log("API 호출 결과:", response);

        if (response && response.boardDTOS) {
          setBoards(response.boardDTOS);
        } else {
          setBoards([]);
          console.log("게시글을 찾을 수 없거나 응답 구조가 예상과 다릅니다.");
        }
      } catch (err) {
        console.error("loadBoards 함수에서 오류 발생:", err);
        setError(err.message || "내 게시글을 불러오는 데 실패했습니다.");
        setBoards([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserNickname();
    loadBoards();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 현재 사용자의 게시글만 필터링
  const filteredBoards = boards.filter((board) => board.nickname === nickname);

  // 로딩 중 UI
  if (loading) return <div>로딩 중...</div>;
  // 에러 발생 시 UI
  if (error) return <div>에러: {error}</div>;

  return (
    <ContentSection>
      {filteredBoards.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <List>
          {filteredBoards.map((board) => (
            <ListItem key={board.id}>
              <ProfileImage src={board.profile} alt="프로필" />
              <div>
                <ListItemTitle>{board.title}</ListItemTitle>
                <ListItemDate>
                  작성일: {new Date(board.regDate).toLocaleDateString()}
                </ListItemDate>
                <ListItemContent>
                  {board.content
                    ? board.content.substring(0, 20) + "..."
                    : "내용 없음"}
                </ListItemContent>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </ContentSection>
  );
};

export default MyBoardsSection;
