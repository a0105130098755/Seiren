package com.example.siren.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.socket.BinaryMessage;

@Getter
@Setter
@ToString
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
