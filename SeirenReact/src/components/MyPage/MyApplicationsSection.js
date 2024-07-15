import React, { useState, useEffect } from "react";
import { fetchSentApplications } from "../../api/Api";
import { List, ListItem, ListItemTitle, ListItemContent } from "./MyPageStyles";

const MyApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSentApplications();
        setApplications(response || []);
      } catch (err) {
        setError("내 지원 현황을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
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
    </div>
  );
};

export default MyApplicationsSection;
