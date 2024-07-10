import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchMyHiring } from "../../api/Api";
import ReceivedApplications from "./ReceivedApplications";
import SentApplications from "./SentApplications";

const MyHiringContainer = styled.div`
  margin-bottom: 40px;
`;

const MyHiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  cursor: pointer;
`;

const TabContent = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  padding: 20px;
`;

const HiringCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
    margin: 5px 0;
  }
`;

const MyHiring = ({ onHiringClick }) => {
  const [myHiringList, setMyHiringList] = useState([]);
  const [activeTab, setActiveTab] = useState("received");

  useEffect(() => {
    const fetchMyHirings = async () => {
      try {
        const response = await fetchMyHiring();
        setMyHiringList(response);
      } catch (error) {
        console.error("Error fetching my hiring list:", error);
      }
    };

    fetchMyHirings();
  }, []);

  return (
    <MyHiringContainer>
      <h2>내가 쓴 글</h2>
      {myHiringList.length === 0 ? (
        <p>아직 작성한 글이 없습니다.</p>
      ) : (
        <MyHiringGrid>
          {myHiringList.map((hiring) => (
            <HiringCard key={hiring.id} onClick={() => onHiringClick(hiring)}>
              <h3>{hiring.title}</h3>
              <p>
                모집 인원: {hiring.current}/{hiring.max}
              </p>
              <p>지역: {hiring.location || "미지정"}</p>
            </HiringCard>
          ))}
        </MyHiringGrid>
      )}
      <TabContainer>
        <Tab
          active={activeTab === "received"}
          onClick={() => setActiveTab("received")}
        >
          받은 신청
        </Tab>
        <Tab active={activeTab === "sent"} onClick={() => setActiveTab("sent")}>
          보낸 신청
        </Tab>
      </TabContainer>
      <TabContent>
        {activeTab === "received" && <ReceivedApplications />}
        {activeTab === "sent" && <SentApplications />}
      </TabContent>
    </MyHiringContainer>
  );
};

export default MyHiring;
