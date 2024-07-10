import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  deleteHiring,
  createJobApplication,
  updateApplicationStatus,
  fetchReceivedApplications,
  teamList,
} from "../../api/Api";
import CryptoJS from "crypto-js";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111/",
  headers: {
    "Content-Type": "application/json",
  },
});

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 80px auto 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
  p {
    margin: 10px 0;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const ApplyButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

const ApplicationsSection = styled.div`
  margin-top: 30px;
`;

const ApplicationCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const StatusButton = styled(Button)`
  background-color: ${(props) => (props.accept ? "#4caf50" : "#f44336")};
  color: white;
  padding: 5px 10px;
  font-size: 14px;
`;

const HiringDetail = ({ hiring, setHiring }) => {
  const [detail, setDetail] = useState(hiring);
  const [applications, setApplications] = useState([]);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();
  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  );
  const currentNickname = bytes.toString(CryptoJS.enc.Utf8);

  const fetchApplications = async () => {
    try {
      console.log("Fetching applications for hiring id:", detail.id);
      const response = await fetchReceivedApplications({ id: detail.id });
      console.log("Applications fetched:", response);
      setApplications(response || []);
    } catch (error) {
      console.error("Error fetching received applications:", error);
    }
  };

  const teamListFunc = async () => {
    try {
      const response = await teamList(hiring);
      console.log(" team :", response.data);
      console.l;
      setTeam(response);
    } catch (error) {
      console.error("Error fetching received applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    teamListFunc();
  }, []);

  const handleApply = async () => {
    if (detail.current >= detail.max) {
      alert("모집 인원이 마감되었습니다.");
      return;
    }
    if (detail.nickname === currentNickname) {
      alert("자신의 글에는 지원할 수 없습니다.");
      return;
    }

    if (team.some((member) => member.nickname === currentNickname)) {
      alert("이미 팀에 속해 있습니다.");
      return;
    }

    try {
      await createJobApplication({ id: detail.id });
      alert("지원이 완료되었습니다.");
      setDetail((prev) => ({ ...prev, current: prev.current + 1 }));
      setHiring((prev) => ({ ...prev, current: prev.current + 1 }));
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("지원 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await deleteHiring(detail);
        if (response) {
          alert("글이 삭제되었습니다.");
          navigate("/job");
        }
      } catch (error) {
        console.error("Error deleting hiring:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleStatusChange = async (application, newStatus) => {
    if (newStatus === 1) {
      try {
        await updateApplicationStatus({
          id: application.id,
          status: 1,
          nickname: application.nickname,
          hiringDTO: application.hiringDTO,
        });
        alert("신청을 수락했습니다.");
        const response = await fetchReceivedApplications({ id: detail.id });
        setApplications(response || []);
      } catch (error) {
        console.error("Error changing application status:", error);
        alert("상태 변경 중 오류가 발생했습니다.");
      }
    } else {
      try {
        await updateApplicationStatus({
          id: application.id,
          status: 2,
          nickname: application.nickname,
          hiringDTO: application.hiringDTO,
        });
        alert("신청을 거절했습니다.");
        const response = await fetchReceivedApplications({ id: detail.id });
        setApplications(response || []);
      } catch (error) {
        console.error("Error changing application status:", error);
        alert("상태 변경 중 오류가 발생했습니다.");
      }
    }
  };

  if (!detail) return <div>로딩 중...</div>;

  return (
    <PageWrapper>
      <Title>{detail.title}</Title>
      <InfoSection>
        <p>작성자: {detail.nickname}</p>
        <p>
          모집 인원: {detail.current}/{detail.max}
        </p>
        <p>지역: {detail.location || "미지정"}</p>
        <p>{detail.content}</p>
      </InfoSection>
      <ButtonGroup>
        {detail.nickname !== localStorage.getItem("nickname") ? (
          <ApplyButton onClick={handleApply}>지원하기</ApplyButton>
        ) : (
          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
        )}
      </ButtonGroup>
      {detail.nickname === currentNickname && (
        <ApplicationsSection>
          <h2>지원자 목록</h2>
          {applications.length === 0 ? (
            <p>아직 지원자가 없습니다.</p>
          ) : (
            applications.map((app) => (
              <ApplicationCard key={app.id}>
                <p>지원자: {app.nickname}</p>
                <p>
                  상태:{" "}
                  {app.status === 0
                    ? "대기 중"
                    : app.status === 1
                    ? "수락됨"
                    : "거절됨"}
                </p>
                {app.status === 0 && (
                  <ButtonGroup>
                    <StatusButton
                      accept
                      onClick={() => handleStatusChange(app, 1)}
                    >
                      수락
                    </StatusButton>
                    <StatusButton onClick={() => handleStatusChange(app, 2)}>
                      거절
                    </StatusButton>
                  </ButtonGroup>
                )}
              </ApplicationCard>
            ))
          )}
        </ApplicationsSection>
      )}
      <ApplicationsSection>
        <h2>팀 목록</h2>
        {team &&
          team.map((teamMember, index) => (
            <ApplicationCard key={index}>
              <p> 팀원 : {teamMember.nickname}</p>
            </ApplicationCard>
          ))}
      </ApplicationsSection>
    </PageWrapper>
  );
};

export default HiringDetail;
