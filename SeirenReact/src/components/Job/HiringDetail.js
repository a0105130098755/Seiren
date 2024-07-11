import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  deleteHiring,
  createJobApplication,
  updateApplicationStatus,
  fetchReceivedApplications,
  teamList,
  teamKick,
} from "../../api/Api";
import axios from "axios";
import {
  PageWrapper,
  ContentWrapper,
  Header,
  InfoSection,
  ButtonGroup,
  Button,
  ApplyButton,
  DeleteButton,
  ApplicationsSection,
  ApplicationCard,
  StatusButton,
  BackButtonWrapper,
} from "./HireDetailStyled";
import BackButton from "../BackButton";

const api = axios.create({
  baseURL: "http://localhost:8111/",
  headers: {
    "Content-Type": "application/json",
  },
});

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
      const response = await fetchReceivedApplications({ id: detail.id });
      setApplications(response || []);
    } catch (error) {
      console.error("Error fetching received applications:", error);
    }
  };

  const teamListFunc = async () => {
    try {
      const response = await teamList(hiring);
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
        setDetail((prev) => ({ ...prev, current: prev.current + 1 }));
        setHiring((prev) => ({ ...prev, current: prev.current + 1 }));
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

  const handleRemoveTeamMember = async (teamMember) => {
    if (window.confirm(`${teamMember.nickname}님을 팀에서 추방하시겠습니까?`)) {
      try {
        const response = await teamKick(teamMember);
        if (response === true) {
          alert("팀원 추방이 완료되었습니다.");
          setTeam((prev) =>
            prev.filter((member) => member.nickname !== teamMember.nickname)
          );
        } else {
          alert("추방은 이 글의 작성자만 가능합니다.");
        }
      } catch (error) {
        console.error("Error removing team member:", error);
        alert("팀원 추방 중 오류가 발생했습니다.");
      }
    }
  };

  if (!detail) return <div>로딩 중...</div>;

  return (
    <PageWrapper>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ContentWrapper>
        <Header>
          <h1>{detail.title}</h1>
        </Header>
        <InfoSection>
          <p>작성자: {detail.nickname}</p>
          <p>
            모집 인원: {detail.current}/{detail.max}
          </p>
          <p>지역: {detail.location || "미지정"}</p>
          <p>{detail.content}</p>
        </InfoSection>
        <ButtonGroup>
          {detail.nickname !== currentNickname ? (
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
                <Button onClick={() => handleRemoveTeamMember(teamMember)}>
                  추방
                </Button>
              </ApplicationCard>
            ))}
        </ApplicationsSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default HiringDetail;
