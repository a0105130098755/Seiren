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
    private String nickname;
    private boolean live;
    private int audience;

    @Builder
    public ChatRoom (String nickname, boolean live, int audience){
        this.nickname = nickname;
        this.live = live;
        this.audience = audience;
    }
}
