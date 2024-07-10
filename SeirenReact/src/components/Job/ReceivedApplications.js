import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchReceivedApplications } from "../../api/Api";

const ApplicationCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
`;

const ReceivedApplications = () => {
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetchReceivedApplications({});
        setReceivedApplications(response);
      } catch (error) {
        console.error("Error fetching received applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>받은 신청</h2>
      {receivedApplications.length === 0 ? (
        <p>아직 받은 신청이 없습니다.</p>
      ) : (
        receivedApplications.map((app) => (
          <ApplicationCard key={app.id}>
            <h3>{app.hiringDTO.title}</h3>
            <p>신청자: {app.nickname}</p>
            <p>
              상태:{" "}
              {app.status === 0
                ? "대기 중"
                : app.status === 1
                ? "수락됨"
                : "거절됨"}
            </p>
          </ApplicationCard>
        ))
      )}
    </div>
  );
};

export default ReceivedApplications;
