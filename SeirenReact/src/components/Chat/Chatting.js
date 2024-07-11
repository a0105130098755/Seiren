import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatApi from "../../api/ChatApi";
import styled, { css } from "styled-components";
import CryptoJS from "crypto-js";

const ChatContainer = styled.div`
  width: 90vw;
  height: 80vh;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatContainerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid blue;
  justify-content: space-between;
  align-items: center;
`;

const ChatContainerLeft = styled.div`
  position: relative;
  width: 16%;
  height: 50%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: end;
`;

const ChatContainerLeftInput = styled.input`
  border: 1px solid #d8dce2;
  padding-left: 6px;
  padding-right: 6px;
  width: 80px;
  height: 30px;
  font-size: 16px;
  border-radius: 4px;

  &::placeholder {
    font-size: 12px;
    color: lightgray;
  }
`;

const ChatContainerMiddle = styled.div`
  width: 48%;
  height: 80%;
  border: 1px solid red;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: auto;
  max-height: 90%;
  border: 1px solid blue;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 6px;
  border-radius: 4px;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  font-weight: ${(props) => (props.isMaster ? "bold" : "normal")};
  border: 1px solid black;
`;

const SendContainer = styled.div`
  width: 100%;
  min-height: 40px;
  height: auto;
  display: flex;
  align-items: center;
`;

const SendInput = styled.input`
  border: 1px solid #d8dce2;
  width: 90%;
  height: 100%;
  padding: 4px;
`;

const SendButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #0075ff;
  color: white;
  border-radius: 100%;
  margin-left: 4px;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  ${(props) =>
    props.clicked &&
    css`
      transform: translateY(2px);
      opacity: 0.7;
    `}
`;
const ChatContainerRight = styled.div`
  width: 26%;
  height: 60%;
  display: flex;
  flex-flow: column;
  align-items: start;
`;
const ChatContainerRightContent = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  overflow-y: auto;
`;

const ButtonDiv = styled.div`
  position: relative;
  width: 100px;
  height: 24px;
  font-size: 12px;
  margin-top: 4px;
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

const Chatting = () => {
  const { roomId } = useParams();
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState(""); // 입력 메세지
  const [chatList, setChatList] = useState(""); // 채팅 리스트
  const [pointList, setPointList] = useState(""); // 포인트 리스트
  const [sender, setSender] = useState(""); // 보낸 사람
  const [myPoint, setMyPoint] = useState(null);
  const [clicked, setClicked] = useState(false);
  const ws = useRef(null);
  const navigate = useNavigate();
  const [inputPoint, setInputPoint] = useState("");
  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("nickname"),
    process.env.REACT_APP_SECRET_KEY
  );
  const currentNickname = bytes.toString(CryptoJS.enc.Utf8);

  const handleMemberInfo = async () => {
    try {
      const response = await ChatApi.memberInfo();
      console.log("내 정보", response);
      console.log("내 닉네임", response.data.nickname);
      setSender(response.data.nickname);
      setMyPoint(response.data.point);
      console.log(response.data.point);
    } catch (e) {
      console.log("멤버 정보 불러오는 데 오류 발생", e);
    }
  };

  useEffect(() => {
    handleMemberInfo();
  });

  const handleChange = (e) => {
    const { value } = e.target;
    const regex = /^\d+$/; // 숫자만 허용하는 정규식
    if (value === "" || regex.test(value)) {
      setInputPoint(value);
      console.log(inputPoint);
    }
  };

  useEffect(() => {
    console.log("방이름 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:8111/ws/chat"); // 웹소켓 연결
      ws.current.onopen = () => {
        // 웹소켓 연결되면
        console.log("웹 소켓 연결됨");
        setSocketConnected(true); // 웹소켓 연결 상태 변경
      };
    }
    if (socketConnected) {
      // 웹소켓 연결되면
      ws.current.send(
        JSON.stringify({
          // 서버에 입장 메시지 전송
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "접속 메세지",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      // 서버에서 메시지가 오면
      const data = JSON.parse(evt.data); // 받은 메시지를 JSON 객체로 변환
      console.log("메세지 타입 : ", data.type);
      console.log("받은 메세지 : ", data.message);
      if (data.type === "TALK") {
        setChatList((prevItems) => [...prevItems, data]); // 채팅 리스트에 추가
      } else if (data.type === "POINT") {
        setPointList((prevItems) => [...prevItems, data]); // 포인트 리스트에 추가
      }
    };
  }, [socketConnected]); // socketConnected 값이 변경되면 useEffect 실행

  const onClickMsgSend = (e) => {
    // 메시지 전송 (소켓 통신), useRef에 값을 저장하기 위해서는 current 메소드 사용해야 함
    ws.current.send(
      JSON.stringify({
        // 자바스크립트 객체를 JSON으로 변환
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg(""); // 전송 이후 초기화
  };

  const onChangeMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onClickMsgSend2 = (e) => {
    // 메시지 전송 (소켓 통신), useRef에 값을 저장하기 위해서는 current 메소드 사용해야 함
    ws.current.send(
      JSON.stringify({
        // 자바스크립트 객체를 JSON으로 변환
        type: "POINT",
        roomId: roomId,
        sender: sender,
        message: inputPoint,
      })
    );
    setInputPoint(""); // 전송 이후 초기화
  };

  const onEnterKey = (e) => {
    // 엔터키 입력 시, 공백 제거 후 비어있지 않으면
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault(); // 기존 이벤트 무시
      onClickMsgSend(e); // 입력 메시지를 전송하는 함수
    }
  };

  // 채팅 종료
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        // 자바스크립트 객체를 JSON으로 변환
        type: "CLOSE",
        roomId: roomId,
        sender: sender,
        message: "퇴장했습니다.",
      })
    );
    ws.current.close(); // 생성된 소켓을 닫음
    navigate("/chat");
  };

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // 채팅 컨테이너가 존재하면
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // 스크롤을 맨 아래로
    }
  }, [chatList]);
  useEffect(() => {
    if (pointRef.current) {
      pointRef.current.scrollTop = pointRef.current.scrollHeight;
    }
  }, [pointList]);

  return (
    <ChatContainer>
      <ChatContainerContent>
        <ChatContainerLeft>
          <p style={{ fontSize: "12px" }}>보유 중인 포인트</p>
          <p style={{ fontSize: "12px" }}>{myPoint} Point</p>
          <ChatContainerLeftInput
            placeholder="포인트 입력"
            value={inputPoint}
            onChange={handleChange}
          ></ChatContainerLeftInput>
          <ButtonDiv onClick={onClickMsgSend2}>포인트 선물하기</ButtonDiv>
        </ChatContainerLeft>
        <ChatContainerMiddle>
          <MessageContainer>
            {chatList &&
              chatList.map((chat, index) => (
                <Message
                  key={index}
                  isSender={chat.sender === currentNickname}
                  isMaster={chat.sender === roomId}
                >
                  <p>{`${chat.sender}`}</p>
                  <p>{`${chat.message}`}</p>
                </Message>
              ))}
          </MessageContainer>
          <SendContainer>
            <SendInput
              placeholder="보낼 메세지를 입력하세요"
              onChange={onChangeMsg}
              onKeyUp={onEnterKey}
            ></SendInput>
            <SendButton
              clicked={clicked}
              onMouseDown={() => setClicked(true)}
              onMouseUp={() => setClicked(false)}
              onMouseLeave={() => setClicked(false)}
              onClick={onClickMsgSend}
            >
              &gt;
            </SendButton>
          </SendContainer>
        </ChatContainerMiddle>
        <ChatContainerRight>
          <ChatContainerRightContent ref={pointRef}>
            {pointList &&
              pointList.map((point, index) => (
                <Message key={index} isSender={true}>
                  <p>{`${point.sender}`}</p>
                  <p>{`${point.message}`}</p>
                </Message>
              ))}
          </ChatContainerRightContent>
          <ButtonDiv style={{ width: "80px" }} onClick={onClickMsgClose}>
            나가기
          </ButtonDiv>
        </ChatContainerRight>
      </ChatContainerContent>
    </ChatContainer>
  );
};

export default Chatting;
