import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatApi from "../../api/ChatApi";
import audienceLogo from "./audience.png";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const ListContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 76vh;
  overflow-y: auto;
  border: 1px solid #d8dce2;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const ListBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 30%;
  height: 20%;
  border: 1px solid #d8dce2;
  margin: auto;
  margin-top: 14px;
  margin-bottom: 14px;
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

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 80vw;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const SerachBar = styled.input`
  position: relative;
  width: 300px;
  height: 24px;
  border: 1px solid #d8dce2;
  border-radius: 4px;
  padding-left: 8px;
  &::placeholder {
    color: #d8dce2;
  }
`;
const SearchBtn = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  font-size: 12px;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #0075ff;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease;
    background-color: #2caeff;
  }
`;
const ChatMain = () => {
  const [chatList, setChatList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const inputRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null); // hover 상태를 개별적으로 관리하기 위한 상태
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  );
  const currentNickname = bytes.toString(CryptoJS.enc.Utf8);

  const handleChatList = async () => {
    try {
      const response = await ChatApi.roomList();
      console.log("chat List ", response);
      setChatList(response.data);
      setViewList(response.data);
    } catch (e) {
      console.log("채팅방 불러오는 데 오류 발생", e);
    }
  };

  const onChangeHandler = (e) => {
    inputRef.current.value = e.target.value;
  };

  const handleSearch = () => {
    const filteredList = chatList.filter((item) =>
      item.roomId.toLowerCase().includes(inputRef.current.value.toLowerCase())
    );
    setViewList(filteredList);
    inputRef.current.value = "";
  };

  const handleShowAll = () => {
    setViewList(chatList);
    inputRef.current.value = "";
  };

  const enterClickHandler = (roomId, audience, live) => {
    console.log(roomId);
    console.log(audience);
    console.log(currentNickname);
    if (roomId === currentNickname) {
      return alert("방송을 시작하려면 방송 시작을 눌러주세요.");
    } else {
      if (!live) {
        return alert("방송중이 아닙니다.");
      } else {
        if (audience < 1) {
          return alert("방송중이 아닙니다.");
        } else {
          navigate(`/chatting/${roomId}`);
        }
      }
    }
  };

  const liveOnClick = () => {
    navigate(`/chatting/${currentNickname}`);
  };

  useEffect(() => {
    handleChatList();
  }, []);

  useEffect(() => {
    const sortedList = [...viewList].sort((a, b) => b.audience - a.audience);
    setSortList(sortedList);
  }, [viewList]);

  return (
    <>
      <ListContainer ref={chatContainerRef}>
        {sortList &&
          sortList.map((value, index) => (
            <ListBox
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() =>
                enterClickHandler(value.roomId, value.audience, value.live)
              }
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
      <SearchContainer>
        <SerachBar
          placeholder="닉네임을 검색하여 찾을 수 있습니다."
          onChange={onChangeHandler}
          ref={inputRef}
        />
        <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        <SearchBtn style={{ width: "54px" }} onClick={handleShowAll}>
          전체 보기
        </SearchBtn>
        <SearchBtn style={{ width: "54px" }} onClick={liveOnClick}>
          방송 하기
        </SearchBtn>
      </SearchContainer>
    </>
  );
};

export default ChatMain;
