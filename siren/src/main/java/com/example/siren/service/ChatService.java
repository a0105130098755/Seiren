package com.example.siren.service;

import com.example.siren.dto.ChatMessageDTO;
import com.example.siren.dto.ChatRoomDTO;
import com.example.siren.entity.Member;
import com.example.siren.repository.ChatRoomRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper;
    private final AuthGetInfo authGetInfo;
    private final ChatRoomRepository chatroomRepository;
    private Map<String, ChatRoomDTO> chatRooms;
    // 채팅방 정보 담을 맵, roomId 에 해당 방 정보가 들어감 (key, value)

    @PostConstruct // 의존성 주입 후 초기화 수행 메소드
    private void init(){
        chatRooms = new LinkedHashMap<>(); // 채팅 방 정보 담을 맵.
    }
    public List<ChatRoomDTO> findAllRoom(){ // 채팅방 전체 리스트 반환
        return new ArrayList<>(chatRooms.values());
    }
    public ChatRoomDTO findRoomById(String roomId){
        return chatRooms.get(roomId);
    }

    // 방 개설 로직
    // 이미 init 할 때 채팅방 정보를 다 넣고,
    // 이후 회원가입이 이뤄질 때 해당 아래의 메소드가 실행 돼
    // 새 계정의 채팅방을 만들어서 추가해주면 된다.
    public void createRoom(Member member){
        String roomId = member.getNickname();
        log.info("회원가입한 {} 님의 방이 만들어집니다. ",roomId);
        ChatRoomDTO chatRoomDTO = ChatRoomDTO.builder()
                .roomId(roomId)
                .build();
        chatRooms.put(roomId,chatRoomDTO); // 생성한 방을 현재 만들어진 방 정보 관리하는 Map 에 넘김
        log.info("회원가입한 {} 님의 방이 만들어졌습니다. ",roomId);
    }

    // 채팅방에 입장한 세션 추가 로직
    public void addSessionAndHandleEnter(String roomId, WebSocketSession session, ChatMessageDTO chatMessage){
        ChatRoomDTO chatRoomDTO = findRoomById(roomId); // 현재 개설된 방 중 해당 roomId 의 방정보를 가져와서
        chatMessage.setSender(authGetInfo.getMember().getNickname());
        if(chatRoomDTO != null){ // 방이 있다면
            if(chatRoomDTO.getSessions().size() == 0){
                // 맨 처음 입장 = 방 개설자 = 해당 방 주인
                // 따라서 시작함을 설정
                chatRoomDTO.setLive(true);
                chatRoomDTO.setRegDate(LocalDateTime.now());
                chatRoomDTO.setAudience(0);
            }
            chatRoomDTO.setAudience(chatRoomDTO.getAudience()+1); // 청자 늘리고
            chatRoomDTO.getSessions().add(session); // 채팅방에 입장한 세션을 추가하고
            if(chatMessage.getSender() != null) {
                chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
                sendMessageToAll(roomId, chatMessage);
            }
            log.warn("새 사용자 입장함! : {} ", chatMessage.getSender());

        }
    }

    // 채팅방에서 퇴장한 세션
    public void removeSessionAndHandleExit(String roomId, WebSocketSession session, ChatMessageDTO chatMessage){
        ChatRoomDTO room = findRoomById(roomId); // 채팅방 정보 가져옴
        chatMessage.setSender(authGetInfo.getMember().getNickname());
        if(room != null) {
            room.getSessions().remove(session); // 방 정보에서 session 에 퇴장한거 삭제
            if(chatMessage.getSender() != null ){
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
                sendMessageToAll(roomId, chatMessage);
            }
            log.warn("퇴장 세션 삭제 : {}" , session);
        }
    }

    // 존재하는 방의 모든 세션에 메세지 보내기
    public void sendMessageToAll(String roomId, ChatMessageDTO chatMessage){
        ChatRoomDTO room = findRoomById(roomId);
        if(room!= null){
            for(WebSocketSession session : room.getSessions()){
                sendMessage(session, chatMessage);
            }
        }
    }

    // 메세지 보내는 로직
    public <T> void sendMessage(WebSocketSession session, T message){
        try{
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }catch (IOException e){
            log.error("웹소켓 텍스트 send 에러 : {}" , e.getMessage());
        }
    }

}
