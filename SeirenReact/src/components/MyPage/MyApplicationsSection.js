import React, { useState, useEffect } from "react";
import { fetchSentApplications } from "../../api/Api";

const MyApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetchSentApplications();
        setApplications(response);
      } catch (err) {
        setError("내 지원 현황을 불러오는 데 실패했습니다.");
        console.error(err);
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
      <h2>지원 현황</h2>
      {applications.length === 0 ? (
        <p>지원한 구인글이 없습니다.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id}>
            <h3>{app.hiringDTO.title}</h3>
            <p>
              상태:{" "}
              {app.status === 0
                ? "대기중"
                : app.status === 1
                ? "수락됨"
                : "거절됨"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplicationsSection;
