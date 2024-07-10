import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  font-family: "Helvetica Neue", Arial, sans-serif;
  padding: 20px;
  margin: 400px;
  max-width: 1000px;
  background: #ffffff;
  border-radius: 8px;
`;

const MainTitle = styled.h1`
  text-align: center;
  color: #333;
  margin: 20px 0;
  font-size: 36px;
`;

const MainImageContainer = styled.div`
  background-color: #f4f4f9;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 8px;
`;

const MainImagePlaceholder = styled.div`
  width: 150px;
  height: 150px;
  border: 3px solid #666;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: #666;
  border-radius: 12px;
`;

const LiveStreamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const LiveStreamCard = styled.div`
  flex: 1;
  min-width: 250px;
  background-color: #ffffff;
  color: #333;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LiveStreamImage = styled.div`
  background-color: #87ceeb;
  height: 150px;
  margin-bottom: 15px;
  border-radius: 6px;
`;

const LiveStreamTitle = styled.h3`
  margin: 8px 0;
  font-size: 20px;
`;

const LiveStreamNickname = styled.p`
  margin: 8px 0;
  font-size: 16px;
`;

const LiveStreamAudience = styled.p`
  margin: 8px 0;
  font-size: 14px;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <MainTitle>main</MainTitle>

      <MainImageContainer>
        <MainImagePlaceholder>+</MainImagePlaceholder>
      </MainImageContainer>

      <LiveStreamContainer>
        {[1, 2, 3].map((i) => (
          <LiveStreamCard key={i}>
            <LiveStreamImage />
            <LiveStreamTitle>title</LiveStreamTitle>
            <LiveStreamNickname>nickname</LiveStreamNickname>
            <LiveStreamAudience>audience</LiveStreamAudience>
          </LiveStreamCard>
        ))}
      </LiveStreamContainer>
    </MainContainer>
  );
};

export default MainPage;
