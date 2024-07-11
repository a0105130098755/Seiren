import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatApi from "../../api/ChatApi";

const Chatting = () => {
  const { roomId } = useParams();
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState(""); // 입력 메세지
  const [chatList, setChatList] = useState(""); // 채팅 리스트
  const [sender, setSender] = useState(""); // 보낸 사람
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const [myPoint, setMyPoint] = useState(null);
  const ws = useRef(null);
  const navigate = useNavigate();

  const handleMemberInfo = async () => {
    try {
      const response = await ChatApi.memberInfo();
      console.log("내 정보", response);
      setMyPoint(response.data.point);
      console.log(response.data.point);
    } catch (e) {
      console.log("멤버 정보 불러오는 데 오류 발생", e);
    }
  };

  useEffect(() => {
    handleMemberInfo();
  }, []);

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
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      // 서버에서 메시지가 오면
      const data = JSON.parse(evt.data); // 받은 메시지를 JSON 객체로 변환
      console.log(data.message);
      setChatList((prevItems) => [...prevItems, data]); // 채팅 리스트에 추가
    };
  }, [socketConnected]); // socketConnected 값이 변경되면 useEffect 실행

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // 채팅 컨테이너가 존재하면
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // 스크롤을 맨 아래로
    }
  }, [chatList]);

  return <></>;
};

export default Chatting;
