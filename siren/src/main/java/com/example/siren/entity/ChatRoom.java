package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {
    @Id
    private String roomId;
    private String profile;
    private boolean live;
    private int audience;

    @Builder
    public ChatRoom (String roomId,String profile, boolean live, int audience){
        this.roomId = roomId;
        this.profile = profile;
        this.live = live;
        this.audience = audience;
    }
}
