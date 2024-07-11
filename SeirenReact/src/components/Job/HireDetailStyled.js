import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
  margin-top: 80px;
  min-height: 80px;
  max-width: 1400px;
  width: 800px;

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #f7f9fc; /* 밝고 세련된 배경색 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50; /* 세련된 텍스트 색상 */
`;

export const InfoSection = styled.div`
  width: 100%;
  background-color: #eef1f5; /* 차분한 배경색 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  p {
    margin: 10px 0;
    color: #34495e; /* 세련된 텍스트 색상 */
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;

export const ApplyButton = styled(Button)`
  background-color: #3498db; /* 세련된 파란색 */
  color: white;
  &:hover {
    background-color: #2980b9; /* 호버 시 색상 */
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #e74c3c; /* 세련된 빨간색 */
  color: white;
  &:hover {
    background-color: #c0392b; /* 호버 시 색상 */
  }
`;

export const ApplicationsSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: #f7f9fc; /* 밝고 세련된 배경색 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ApplicationCard = styled.div`
  background-color: #ffffff; /* 카드 배경색 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

export const StatusButton = styled(Button)`
  background-color: ${(props) =>
    props.accept ? "#2ecc71" : "#e74c3c"}; /* 세련된 색상 */
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  &:hover {
    background-color: ${(props) =>
      props.accept ? "#27ae60" : "#c0392b"}; /* 호버 시 색상 */
  }
`;