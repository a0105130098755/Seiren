package com.example.siren.entity;

import com.example.siren.constant.Authority;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Entity
@Table
@ToString
@NoArgsConstructor
public class Token {
    @Id
    private String email;
    private String refreshToken;

    @Builder
    public Token(String email,String refreshToken){
        this.email = email;
        this.refreshToken = refreshToken;
    }
}
