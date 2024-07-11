import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 200px;
  padding: 20px;
  padding-top: 80px;
  font-family: "Noto Sans", sans-serif;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const MyHiringContainer = styled.div`
  margin-bottom: 40px;
  overflow-y: hidden;
`;

export const MyHiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  overflow-y: auto;
  max-height: 60vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HiringPageContainer = styled.div`
  flex: 6;
  margin-right: 20px;
  margin-top: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 10px;
  }
`;

export const ApplicationsContainer = styled.div`
  flex: 1.5;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding-left: 0;
    border-left: none;
    margin-top: 10px;
  }
`;

export const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 10px);
  background-position-y: center;
  margin-right: 10px;
  cursor: pointer;
  height: 50px;
  line-height: 20px; /* 텍스트가 세로로 나오지 않도록 설정 */
  flex-direction: row;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  height: 50px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const SearchButton = styled.button`
  padding: 10px 24px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 20px;
  flex-direction: row;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #003f7f);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const CreateButton = styled(Link)`
  padding: 10px 24px; /* 검색 입력창 높이에 맞추기 위해 패딩 조정 */
  background: linear-gradient(135deg, #28a745, #218838);
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* 높이 설정 */
  line-height: 20px; /* 텍스트가 세로로 나오지 않도록 설정 */
  flex-direction: row; /* 텍스트를 가로로 정렬 */

  &:hover {
    background: linear-gradient(135deg, #218838, #1c7430);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HiringCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
    transition: color 0.3s;
  }

  p {
    color: #666;
    font-size: 16px;
    margin: 5px 0;
  }

  &:hover h3 {
    color: #007bff;
  }
`;

export const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;
