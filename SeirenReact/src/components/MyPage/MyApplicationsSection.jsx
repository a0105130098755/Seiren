import React, { useState, useEffect } from "react";
import { fetchSentApplications } from "../../api/hiringApi";
import {
  ContentSection,
  SectionTitle,
  List,
  ListItem,
  ListItemTitle,
  ListItemContent,
} from "./MyPageStyles";

// MyApplicationsSection 컴포넌트: 사용자의 지원 현황을 표시
const MyApplicationsSection = () => {
  // 지원 목록 상태
  const [applications, setApplications] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 상태
  const [error, setError] = useState(null);

  useEffect(() => {
    // 지원 목록을 불러오는 비동기 함수
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSentApplications();
        setApplications(response || []);
      } catch (err) {
        setError("내 지원 현황을 불러오는 데 실패했습니다.");
        // TODO: 에러 로깅 또는 사용자에게 더 자세한 피드백 제공
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 로딩 중 UI
  if (loading) return <div>로딩 중...</div>;
  // 에러 발생 시 UI
  if (error) return <div>에러: {error}</div>;

  return (
    <ContentSection>
      {applications.length === 0 ? (
        <p>지원한 구인글이 없습니다.</p>
      ) : (
        <List>
          {applications.map((app) => (
            <ListItem key={app.id}>
              <ListItemTitle>
                {app.hiringDTO?.title || "제목 없음"}
              </ListItemTitle>
              <ListItemContent>
                상태:{" "}
                {app.status === 0
                  ? "대기중"
                  : app.status === 1
                  ? "수락됨"
                  : "거절됨"}
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
    </ContentSection>
  );
};

export default MyApplicationsSection;
