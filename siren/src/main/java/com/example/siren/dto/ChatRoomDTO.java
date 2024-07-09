package com.example.siren.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Slf4j
@Setter
public class ChatRoomDTO {
    private String roomId; // 현 채팅방 ID = userNickname
    private String profile;
    private boolean live;
    private int audience;
    private LocalDateTime regDate; // 시작 시간
    @JsonIgnore
    private Set<WebSocketSession> sessions; // 채팅방에 입장해서 연결된 세션 관리하는 set

    public boolean isSessionEmpty() {
        return this.sessions.isEmpty(); // 현재 연결된 세션이 0인지 확인
    }
    @Builder
    public ChatRoomDTO(String roomId, String profile, boolean live, int audience){
        this.roomId = roomId;
        this.profile = profile;
        this.live = live;
        this.audience = audience;
        this.sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    }
}
