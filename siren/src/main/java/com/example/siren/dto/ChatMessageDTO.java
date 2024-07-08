package com.example.siren.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    public enum MessageType{
        ENTER, TALK, VOICE, CLOSE
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
}
