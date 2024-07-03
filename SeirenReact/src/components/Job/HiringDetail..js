import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HiringDetailPage = styled.div`
  padding: 20px;
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

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const HiringContent = styled.div`
  margin-bottom: 20px;
`;

function HiringDetail({ hiringContent }) {
  const [hiring, setHiring] = useState(null);

  useEffect(() => {
    setHiring(hiringContent);
  }, [hiringContent]);

  if (!hiring) {
    return <div>구인 글을 불러오는 중입니다...</div>;
  }

  return (
    <HiringDetailPage>
      <HiringDetailContainer>
        <HiringTitle>{hiring.title}</HiringTitle>
        <HiringInfo>
          <ProfileImage
            src={hiring.profile || "default-profile.jpg"}
            alt="Profile"
          />
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
      </HiringDetailContainer>
    </HiringDetailPage>
  );
}

export default HiringDetail;
