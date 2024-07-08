import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  fetchHiringDetail,
  deleteHiring,
  createJobApplication,
  updateApplicationStatus,
} from "../../api/Api";

const HiringDetailPage = styled.div`
  padding: 80px 20px 20px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const HiringDetailContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const HiringTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const HiringInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HiringContent = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px;
  background-color: ${(props) => props.bgColor || "#007bff"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0056b3"};
  }
`;

const HiringDetail = ({ hiring, setHiring }) => {
  const [detail, setDetail] = useState(hiring);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log("Fetching hiring detail for id:", hiring.id);
        const data = await fetchHiringDetail(hiring.id);
        console.log("Fetched hiring detail:", data);
        setDetail(data);
        setHiring(data);
      } catch (error) {
        console.error("구인 글 상세 정보를 불러오는 데 실패했습니다.", error);
        alert("구인 글 상세 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchDetail();
  }, [hiring.id, setHiring]);

  const handleApply = async () => {
    if (detail.current >= detail.max) {
      alert("신청 인원이 초과되었습니다.");
      return;
    }

    if (detail.nickname === localStorage.getItem("nickname")) {
      alert("본인이 작성한 글에는 신청할 수 없습니다.");
      return;
    }

    try {
      const response = await createJobApplication(detail);
      if (response) {
        alert("구인 신청이 성공적으로 제출되었습니다.");
        setDetail({ ...detail, current: detail.current + 1 }); // 신청 인원 업데이트
      } else {
        alert("이미 신청하신 글입니다.");
      }
    } catch (error) {
      console.error("구인 신청에 실패했습니다.", error);
      alert("구인 신청에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await deleteHiring(detail);
        if (response) {
          alert("구인 정보가 삭제되었습니다.");
          navigate("/job");
        } else {
          alert("니가 쓴 글만 지워라.");
        }
      } catch (error) {
        console.error("구인 정보를 삭제하는데 실패했습니다.", error);
        alert("구인 정보를 삭제하는데 실패했습니다.");
      }
    }
  };

  const handleStatusChange = async (status) => {
    const sendDTO = {
      id: detail.id,
      nickname: localStorage.getItem("nickname"),
      status,
      hiringDTO: detail,
    };

    try {
      const response = await updateApplicationStatus(sendDTO);
      if (response) {
        alert(`구인 신청이 ${status === 1 ? "수락" : "거절"}되었습니다.`);
        if (status === 1) {
          setDetail({ ...detail, current: detail.current + 1 }); // 신청 인원 업데이트
        }
      } else {
        alert("상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("구인 신청 상태 변경에 실패했습니다.", error);
      alert("구인 신청 상태 변경에 실패했습니다.");
    }
  };

  if (!detail) {
    return <div>구인 글을 불러오는 중입니다...</div>;
  }

  return (
    <HiringDetailPage>
      <HiringDetailContainer>
        <HiringTitle>{detail.title}</HiringTitle>
        <HiringInfo>
          <div>
            <span>{detail.nickname}</span>
          </div>
        </HiringInfo>
        <HiringContent>{detail.content}</HiringContent>
        <div>
          <p>
            모집 인원: {detail.current}/{detail.max}
          </p>
          <p>지역: {detail.location || "지역 정보 없음"}</p>
        </div>
        <ButtonContainer>
          <ActionButton
            onClick={handleApply}
            bgColor="#28a745"
            hoverColor="#218838"
          >
            신청하기
          </ActionButton>
          <ActionButton
            onClick={handleDelete}
            bgColor="#ff4d4d"
            hoverColor="#e60000"
          >
            내 글 삭제
          </ActionButton>
          <ActionButton
            onClick={() => handleStatusChange(1)}
            bgColor="#007bff"
            hoverColor="#0056b3"
          >
            수락
          </ActionButton>
          <ActionButton
            onClick={() => handleStatusChange(2)}
            bgColor="#ff4d4d"
            hoverColor="#e60000"
          >
            거절
          </ActionButton>
        </ButtonContainer>
      </HiringDetailContainer>
    </HiringDetailPage>
  );
};

export default HiringDetail;
