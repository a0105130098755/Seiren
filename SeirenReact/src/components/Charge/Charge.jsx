import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const Card = styled.div`
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === "#000000" ? "white" : "black")};
  border-radius: 20px;
  padding: 50px;
  width: calc(33.333% - 27px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const PointAmount = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Price = styled.h1`
  font-size: 72px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  margin-bottom: auto;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: white;
  color: #1a1a1a;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Charge = () => {
  return (
    <PageContainer>
      <CardContainer>
        <Card color="#c0c0c0">
          <PointAmount>100 Point</PointAmount>
          <Price>50원</Price>
          <Description>가장 기본 금액</Description>
          <Button>충전하기 →</Button>
        </Card>

        <Card color="#808080">
          <PointAmount>240 Point</PointAmount>
          <Price>100원</Price>
          <Description>기본 금액의 추가 20% 효율</Description>
          <Button>충전하기 →</Button>
        </Card>

        <Card color="#000000">
          <PointAmount>600 Point</PointAmount>
          <Price>200원</Price>
          <Description>기본 금액의 추가 50% 효율</Description>
          <Button>충전하기 →</Button>
        </Card>
      </CardContainer>
    </PageContainer>
  );
};

export default Charge;
