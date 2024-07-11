import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #d8dce2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

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

const HiringCard = ({ hiring, onClick }) => (
  <Card onClick={() => onClick(hiring)}>
    <h3>{hiring.title}</h3>
    <p>작성자: {hiring.nickname}</p>
    <p>
      모집 인원: {hiring.current}/{hiring.max}
    </p>
    <p>지역: {hiring.location || "미지정"}</p>
  </Card>
);

export default HiringCard;
