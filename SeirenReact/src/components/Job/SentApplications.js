import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchSentApplications, deleteApplication } from "../../api/Api";

const ApplicationCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #4a5c6a;
  }
`;

const SentApplications = () => {
  const [sentApplications, setSentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetchSentApplications();
        setSentApplications(response);
      } catch (error) {
        console.error("Error fetching sent applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (application) => {
    if (application.status === 1) {
      alert("신청 내역이 확인되었습니다.");
      try {
        await deleteApplication({
          id: application.id,
          nickname: application.nickname,
        });
        setSentApplications((prev) =>
          prev.filter((app) => app.id !== application.id)
        );
      } catch (error) {
        console.error("확인 중 오류 발생:", error);
        alert("오류가 발생했습니다.");
      }
    } else {
      if (window.confirm("정말로 신청을 취소하시겠습니까?")) {
        try {
          await deleteApplication({
            id: application.id,
            nickname: application.nickname,
          });
          setSentApplications((prev) =>
            prev.filter((app) => app.id !== application.id)
          );
          alert("신청이 취소되었습니다.");
        } catch (error) {
          console.error("신청 취소 중 오류 발생:", error);
          alert("신청 취소 중 오류가 발생했습니다.");
        }
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>보낸 신청</h2>
      {sentApplications.length === 0 ? (
        <p>아직 보낸 신청이 없습니다.</p>
      ) : (
        sentApplications.map((app) => (
          <ApplicationCard key={app.id}>
            <h3>{app.hiringDTO.title}</h3>
            <p>작성자: {app.hiringDTO.nickname}</p>
            <p>
              상태:{" "}
              {app.status === 0
                ? "대기 중"
                : app.status === 1
                ? "수락됨"
                : "거절됨"}
            </p>
            <Button onClick={() => handleDelete(app)}>삭제</Button>
          </ApplicationCard>
        ))
      )}
    </div>
  );
};

export default SentApplications;
