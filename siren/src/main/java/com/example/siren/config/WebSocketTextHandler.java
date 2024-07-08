package com.example.siren.config;

import com.example.siren.dto.ChatMessageDTO;
import com.example.siren.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketTextHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String payload = message.getPayload();
        log.warn("사용자가 보낸 메세지 payload : {}", payload);
        //JSON 문자열 ChatMessageDTO 객체 변환
        ChatMessageDTO chatMessageDTO = objectMapper.readValue(payload, ChatMessageDTO.class);
        String roomId = chatMessageDTO.getRoomId(); //채팅방 아이디
        
        if(chatMessageDTO.getType() == ChatMessageDTO.MessageType.ENTER){
            //첫 입장 로직
            //입장한 세션을 roomId와 매핑해서 맵에 집어 넣음
            sessionRoomIdMap.put(session, chatMessageDTO.getRoomId());
            // 이후 입장한 세션을 추가하는 로직 실행
            chatService.addSessionAndHandleEnter(roomId,session,chatMessageDTO);
        }else if(chatMessageDTO.getType() == ChatMessageDTO.MessageType.CLOSE){
            //퇴장 로직
            chatService.removeSessionAndHandleExit(roomId, session, chatMessageDTO);
        }else if(chatMessageDTO.getType() == ChatMessageDTO.MessageType.TALK){
            //일반 채팅 로직
            chatService.sendMessageToAll(roomId, chatMessageDTO);
        }
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        // 세션과 매핑된 채팅방 ID 가져옴
        log.warn("afterConnectionClosed 메소드 실행 세션 : {}", session);

        // sessionRoomIdMap 에서 등록된 세션을 지우고
        String roomId = sessionRoomIdMap.remove(session);
        if(roomId != null){
            ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
            chatMessageDTO.setType(ChatMessageDTO.MessageType.CLOSE);
            chatService.removeSessionAndHandleExit(roomId,session, chatMessageDTO);
        }
    }
}
