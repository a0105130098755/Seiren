import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
  margin-top: 80px;
  min-height: 80px;
  max-width: 1400px;
  width: 800px;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 20px;
    width: 400px;
    flex-direction: column;
    align-items: center;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  color: #253745;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  background-color: #11212d;
  color: white; /* Ensure default text color is white */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  p {
    margin: 10px 0;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    width: 100%; /* 모바일에서 너비 100%로 설정 */
  }
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

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: 100%; /* 모바일에서 너비 100%로 설정 */
  }
`;

export const ApplyButton = styled(Button)`
  background-color: #4a5c6a;
  color: white;
  &:hover {
    background-color: #253745;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #c33740;
  color: white;
  &:hover {
    background-color: #11212d;
  }
`;

export const ApplicationsSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: #eef1f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  h2 {
    color: #253745;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    h2 {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
`;

export const ApplicationCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    color: #4a5c6a;
  }

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    p {
      font-size: 14px;
    }
  }
`;

export const StatusButton = styled(Button)`
  background-color: ${(props) => (props.accept ? "#06141b" : "#e74c3c")};
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => (props.accept ? "#11212d" : "#c0392b")};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    width: 100%;
  }
`;

export const KickButton = styled(Button)`
  background-color: #ab3130;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  &:hover {
    background-color: #67191f;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    width: 100%;
  }
`;

export const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin-top: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
