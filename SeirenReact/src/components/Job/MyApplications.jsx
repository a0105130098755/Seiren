import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  fetchSentApplications,
  fetchReceivedApplications,
} from "../../api/hiringApi";

// 스타일 컴포넌트 정의
const Container = styled.div`
  // ... (스타일 코드)
`;

// ... (다른 스타일 컴포넌트들)

// MyApplications 컴포넌트: 사용자의 신청 및 받은 신청을 관리하고 표시
const MyApplications = () => {
  // 활성 탭 상태 (sent: 보낸 신청, received: 받은 신청)
  const [activeTab, setActiveTab] = useState("sent");
  // 보낸 신청 목록 상태
  const [sentApplications, setSentApplications] = useState([]);
  // 받은 신청 목록 상태
  const [receivedApplications, setReceivedApplications] = useState([]);

  useEffect(() => {
    // 보낸 신청 목록을 가져오는 함수
    const fetchSent = async () => {
      try {
        const response = await fetchSentApplications();
        setSentApplications(response);
      } catch (error) {
        console.error("내가 신청한 글을 불러오는 데 실패했습니다.", error);
        // TODO: 사용자에게 오류 메시지 표시
      }
    };

    // 받은 신청 목록을 가져오는 함수
    const fetchReceived = async () => {
      try {
        const response = await fetchReceivedApplications();
        setReceivedApplications(response);
      } catch (error) {
        console.error("받은 신청을 불러오는 데 실패했습니다.", error);
        // TODO: 사용자에게 오류 메시지 표시
      }
    };

    fetchSent();
    fetchReceived();
  }, []);

  // 신청 상태를 문자열로 변환하는 헬퍼 함수
  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "대기중";
      case 1:
        return "수락됨";
      case 2:
        return "거절됨";
      default:
        return "알 수 없음";
    }
  };

  return (
    <Container>
      {/* 탭 네비게이션 */}
      <TabContainer>
        <Tab active={activeTab === "sent"} onClick={() => setActiveTab("sent")}>
          내가 신청한 글
        </Tab>
        <Tab
          active={activeTab === "received"}
          onClick={() => setActiveTab("received")}
        >
          받은 신청
        </Tab>
      </TabContainer>
      {/* 탭 내용 */}
      <TabContent>
        {activeTab === "sent" && (
          <div>
            {sentApplications.map((app) => (
              <ApplicationCard key={app.id}>
                <h3>{app.hiringDTO.title}</h3>
                <p>작성자: {app.hiringDTO.nickname}</p>
                <p>내용: {app.hiringDTO.content}</p>
                <p>상태: {getStatusString(app.status)}</p>
              </ApplicationCard>
            ))}
          </div>
        )}
        {activeTab === "received" && (
          <div>
            {receivedApplications.map((app) => (
              <ApplicationCard key={app.id}>
                <h3>{app.hiringDTO.title}</h3>
                <p>신청자: {app.nickname}</p>
                <p>내용: {app.hiringDTO.content}</p>
                <p>상태: {getStatusString(app.status)}</p>
              </ApplicationCard>
            ))}
          </div>
        )}
      </TabContent>
    </Container>
  );
};

export default MyApplications;
