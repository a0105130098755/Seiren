import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  fetchSentApplications,
  fetchReceivedApplications,
} from "../../api/hiringApi";

const Container = styled.div`
  padding: 80px 20px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 10px 10px 10px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => (props.active ? "#007bff" : "#ddd")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#ccc")};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin-right: 5px;
    font-size: 14px;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ApplicationCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 8px;
  }
`;

const MyApplications = () => {
  const [activeTab, setActiveTab] = useState("sent");
  const [sentApplications, setSentApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const response = await fetchSentApplications();
        setSentApplications(response);
      } catch (error) {
        console.error("내가 신청한 글을 불러오는 데 실패했습니다.", error);
      }
    };

    const fetchReceived = async () => {
      try {
        const response = await fetchReceivedApplications();
        setReceivedApplications(response);
      } catch (error) {
        console.error("받은 신청을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchSent();
    fetchReceived();
  }, []);

  return (
    <Container>
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
      <TabContent>
        {activeTab === "sent" && (
          <div>
            {sentApplications.map((app) => (
              <ApplicationCard key={app.id}>
                <h3>{app.hiringDTO.title}</h3>
                <p>작성자: {app.hiringDTO.nickname}</p>
                <p>내용: {app.hiringDTO.content}</p>
                <p>
                  상태:{" "}
                  {app.status === 0
                    ? "대기중"
                    : app.status === 1
                    ? "수락됨"
                    : "거절됨"}
                </p>
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
                <p>
                  상태:{" "}
                  {app.status === 0
                    ? "대기중"
                    : app.status === 1
                    ? "수락됨"
                    : "거절됨"}
                </p>
              </ApplicationCard>
            ))}
          </div>
        )}
      </TabContent>
    </Container>
  );
};

export default MyApplications;
