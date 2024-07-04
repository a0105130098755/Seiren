import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { fetchHiringDetail, deleteHiring } from "../../api/Api";

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

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

function HiringDetail({ hiring }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await deleteHiring(hiring);
        if (response) {
          alert("구인 정보가 삭제되었습니다.");
          navigate("/job");
        } else {
          alert("니가 쓴 글만 지워라.");
        }
      } catch (error) {
        console.error("구인 정보를 삭제하는데 실패했습니다.", error);
      }
    }
  };

  if (!hiring) {
    return <div>구인 글을 불러오는 중입니다...</div>;
  }

  return (
    <HiringDetailPage>
      <HiringDetailContainer>
        <HiringTitle>{hiring.title}</HiringTitle>
        <HiringInfo>
          <div>
            <span>{hiring.nickname}</span>
          </div>
        </HiringInfo>
        <HiringContent>{hiring.content}</HiringContent>
        <div>
          <p>
            모집 인원: {hiring.current}/{hiring.max}
          </p>
          <p>지역: {hiring.location || "지역 정보 없음"}</p>
        </div>
        <DeleteButton onClick={handleDelete}>내 글 삭제</DeleteButton>
      </HiringDetailContainer>
    </HiringDetailPage>
  );
}

export default HiringDetail;
