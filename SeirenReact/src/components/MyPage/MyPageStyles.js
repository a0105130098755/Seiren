import styled from "styled-components";

export const PageContainer = styled.div`
  margin-top: 200px;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  padding: 3rem;
  color: #11212d;
  font-family: "Arial", sans-serif;
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 16px;
  }
`;

export const PageTitle = styled.h1`
  text-align: center;
  color: black;
  margin-bottom: 2rem;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  background: #253745;
  border-radius: 24px;
  padding: 0.5rem;
  @media (max-width: 768px) {
    border-radius: 16px;
  }
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

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const ContentSection = styled.div`
  background-color: #253745;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #253745;
  padding: 3rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px solid #9ba8ab;
  border-radius: 16px;
  background-color: #4a5c6a;
  color: #ccd0cf;
  font-size: 1.2rem;

  &::placeholder {
    color: #e0e0e0;
  }

  &:focus {
    outline: none;
    border-color: #fd5a46;
  }
`;

export const SubmitButton = styled.button`
  background-color: #fd5a46;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  align-self: center;
  width: 100%;

  &:hover {
    background-color: #c33740;
    transform: scale(1.05);
  }
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

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: #4a5c6a;
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const ListItemTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fd5a46;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ListItemContent = styled.p`
  margin: 0.5rem 0;
  color: #ccd0cf;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ListItemDate = styled.span`
  font-size: 0.9rem;
  color: #9ba8ab;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const UserInfoItem = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

export const UserInfoLabel = styled.span`
  font-weight: bold;
  color: #9ba8ab;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

export const UserInfoValue = styled.span`
  color: #ccd0cf;
  font-size: 1.2rem;
`;

export const EditButton = styled.button`
  background-color: #fd5a46;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #c33740;
    transform: scale(1.05);
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const CustomFileInputButton = styled.label`
  background-color: #4a5c6a;
  color: #ccd0cf;
  border: 2px solid #9ba8ab;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  margin-left: 1rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileName = styled.span`
  color: #ccd0cf;
  flex-grow: 1;
  text-align: left;
  padding: 0.75rem 1.5rem;
  border: 2px solid #9ba8ab;
  border-radius: 16px;
  background-color: #4a5c6a;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  object-fit: cover;
`;
