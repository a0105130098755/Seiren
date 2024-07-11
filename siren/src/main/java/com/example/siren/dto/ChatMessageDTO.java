package com.example.siren.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.BinaryMessage;

@Getter
@Setter
public class ChatMessageDTO {
    public enum MessageType{
        ENTER, TALK, VOICE, CLOSE, POINT
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    private BinaryMessage voice;
}
