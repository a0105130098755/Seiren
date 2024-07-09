import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatApi from "../../api/ChatApi";
import audienceLogo from "./audience.png";

const ListContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 80vh;
  border: 3px solid black;
  display: flex;
`;

const ListBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 30%;
  height: 20%;
  border: 1px solid #d8dce2;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  transition: all 0.3s ease; // 애니메이션 효과를 위한 트랜지션 추가
  &:hover {
    transform: translateY(-10px); // 호버 시 위로 살짝 올라가는 효과
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  font-weight: bold;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

const TitleContent = styled.div`
  display: flex;
  flex-flow: column;
  text-align: left;
`;

const Content = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const OnOff = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${(props) => (props.live ? "green" : "red")};
`;

const AudienceLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const ChatMain = () => {
  const [chatList, setChatList] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null); // hover 상태를 개별적으로 관리하기 위한 상태

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
            <ListBox
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Title>
                <Profile src={value.profile} />
                <TitleContent>
                  <p>{value.roomId}</p>
                  <p style={{ fontSize: "12px", fontWeight: "normal" }}>
                    님의 방송 입니다.
                  </p>
                </TitleContent>
              </Title>
              {hoverIndex === index ? (
                <div style={{ fontSize: "12px", margin: "auto" }}>입장하기</div>
              ) : (
                <Content>
                  <div style={{ display: "flex", fontSize: "10px" }}>
                    <OnOff live={value.live}></OnOff>
                    <p>{value.live ? <>온라인</> : <>오프라인</>}</p>
                  </div>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <AudienceLogo src={audienceLogo} /> {value.audience}
                  </p>
                </Content>
              )}
            </ListBox>
          ))}
      </ListContainer>
    </>
  );
};

export default ChatMain;
