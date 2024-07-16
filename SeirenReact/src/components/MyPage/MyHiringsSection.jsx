import React, { useState, useEffect } from "react";
import { fetchMyHiring } from "../../api/hiringApi";
import { List, ListItem, ListItemTitle, ListItemContent } from "./MyPageStyles";

// MyHiringsSection 컴포넌트: 사용자가 작성한 구인글 목록을 표시
const MyHiringsSection = () => {
  // 구인글 목록 상태
  const [hirings, setHirings] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 상태
  const [error, setError] = useState(null);

  useEffect(() => {
    // 구인글 목록을 불러오는 비동기 함수
    const loadHirings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMyHiring();
        setHirings(response || []); // 응답이 없을 경우 빈 배열 설정
      } catch (err) {
        setError("내 구인글을 불러오는 데 실패했습니다.");
        // TODO: 에러 로깅 또는 사용자에게 더 자세한 피드백 제공
      } finally {
        setLoading(false);
      }
    };

    loadHirings();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 로딩 중 UI
  if (loading) return <div>로딩 중...</div>;
  // 에러 발생 시 UI
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      {hirings.length === 0 ? (
        <p>작성한 구인글이 없습니다.</p>
      ) : (
        <List>
          {hirings.map((hiring) => (
            <ListItem key={hiring.id}>
              <ListItemTitle>{hiring.title}</ListItemTitle>
              <ListItemContent>
                모집 인원: {hiring.current}/{hiring.max}
              </ListItemContent>
              <ListItemContent>
                지역: {hiring.location || "미지정"}
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyHiringsSection;
