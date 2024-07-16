package com.example.siren.entity;

import com.example.siren.constant.Authority;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table
@ToString
@NoArgsConstructor
@Setter
public class Member {
    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String profile;
    private String phone;
    private int point;
    private LocalDateTime regDate;
    private boolean kakao;
    private boolean status;


    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String email, String password, String name, String nickname, String profile, String phone, Authority authority, boolean kakao){
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
        this.phone = phone;
        this.point = 0;
        this.status = true;
        this.kakao = kakao;
        this.authority = authority;
        this.regDate = LocalDateTime.now();
    }

    public void updatePoint (int point){
        this.point = point;
    }

    public void updatePassword(PasswordEncoder passwordEncoder, String password){
        this.password = passwordEncoder.encode(password);
    }

    public void updateNickname(String nickname){
        this.nickname = nickname;
    }

    public void updateStatus(boolean status){
        this.status = status;
    }

}
