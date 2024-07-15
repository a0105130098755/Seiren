import styled from "styled-components";

export const PageContainer = styled.div`
  margin-top: 200px;
  background-color: #11212d;
  min-height: 100vh;
  padding: 3rem;
  color: #ccd0cf;
  font-family: "Arial", sans-serif;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  background: #253745;
  border-radius: 50px;
  padding: 0.5rem;
`;

export const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#4A5C6A" : "transparent")};
  color: ${(props) => (props.active ? "#FFF" : "#9BA8AB")};
  border: none;
  padding: 1rem 2rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 25px;

  &:hover {
    background-color: #4a5c6a;
    color: #fff;
  }
`;

export const ContentSection = styled.div`
  background-color: #253745;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const SectionTitle = styled.h2`
  color: #fd5a46;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: #4a5c6a;
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Button = styled.button`
  background-color: #fd5a46;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #c33740;
    transform: scale(1.05);
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #253745;
  padding: 3rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px solid #9ba8ab;
  border-radius: 25px;
  background-color: #4a5c6a;
  color: #ccd0cf;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #fd5a46;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 1.5rem;
  align-self: center;
  width: 100%;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: #9ba8ab;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #fd5a46;
  }
`;

export const UserInfoItem = styled.div`
  background-color: #4a5c6a;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const UserInfoLabel = styled.span`
  font-weight: bold;
  color: #9ba8ab;
  margin-right: 1rem;
`;

export const UserInfoValue = styled.span`
  color: #ccd0cf;
`;
export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
