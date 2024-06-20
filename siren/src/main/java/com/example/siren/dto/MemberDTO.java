package com.example.siren.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberDTO {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String profile;
    private String phone;
    private int point;
    private LocalDateTime regDate;
    boolean status;

    @Builder
    public MemberDTO (String email, String password, String name,
                      String nickname, String profile, String phone,
                      int point, LocalDateTime regDate, boolean status){
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
        this.phone = phone;
        this.point = point;
        this.regDate = regDate;
        this.status = status;
    }

}
