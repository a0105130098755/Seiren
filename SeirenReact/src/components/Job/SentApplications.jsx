import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchSentApplications, deleteApplication } from "../../api/hiringApi";

// 스타일 컴포넌트 정의
const ApplicationCard = styled.div`
  // ... (스타일 코드)
`;

const Button = styled.button`
  // ... (스타일 코드)
`;

// SentApplications 컴포넌트: 사용자가 보낸 지원 신청 목록을 표시하고 관리
const SentApplications = () => {
  // 보낸 지원 신청 목록 상태
  const [sentApplications, setSentApplications] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 보낸 지원 신청 목록을 가져오는 함수
    const fetchApplications = async () => {
      try {
        const response = await fetchSentApplications();
        setSentApplications(response);
      } catch (error) {
        console.error("Error fetching sent applications:", error);
        // TODO: 사용자에게 오류 메시지 표시
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 지원 신청 삭제 핸들러
  const handleDelete = async (application) => {
    if (application.status === 1) {
      // 수락된 신청의 경우
      alert("신청 내역이 확인되었습니다.");
      try {
        await deleteApplication({
          id: application.id,
          nickname: application.nickname,
        });
        // 상태 업데이트: 삭제된 신청 제거
        setSentApplications((prev) =>
          prev.filter((app) => app.id !== application.id)
        );
      } catch (error) {
        console.error("확인 중 오류 발생:", error);
        alert("오류가 발생했습니다.");
      }
    } else {
      // 대기 중이거나 거절된 신청의 경우
      if (window.confirm("정말로 신청을 취소하시겠습니까?")) {
        try {
          await deleteApplication({
            id: application.id,
            nickname: application.nickname,
          });
          // 상태 업데이트: 삭제된 신청 제거
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
