import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px auto;
  display: block;

  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
    width: 50%;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
    width: 30%;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(-1)}>뒤로 가기</Button>;
};

export default BackButton;
