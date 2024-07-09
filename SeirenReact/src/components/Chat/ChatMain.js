import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatApi from "../../api/ChatApi";

const ListContainer = styled.div`
  position: relative;
  width: 70vw;
  height: 80vh;
  border: 3px solid black;
  display: flex;
`;

const ListBox = styled.div`
  position: relative;
  width: 30%;
  height: 20%;
  border: 1px solid #d8dce2;
  margin: auto;
  border-radius: 20px;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const ChatMain = () => {
  const [chatList, setChatList] = useState([]);

  const handleChatList = async () => {
    try {
      const response = await ChatApi.roomList();
      console.log("chat List ", response);
      setChatList(response.data);
    } catch (e) {
      console.log("채팅방 불러오는 데 오류 발생", e);
    }
  };
  useEffect(() => {
    handleChatList();
  }, []);
  return (
    <>
      <ListContainer>
        {chatList &&
          chatList.map((value, index) => (
            <ListBox key={index}>
              <Profile src={value.profile} />
              {value.roomId} : {value.live ? "온라인" : "오프라인"}
              <br />
              참가인원 : {value.audience}
            </ListBox>
          ))}
      </ListContainer>
    </>
  );
};

export default ChatMain;
