package com.example.siren.dto;

import com.example.siren.constant.Authority;
import com.example.siren.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDTO {
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String profile;
    private String phone;

    public Member toEntity(PasswordEncoder passwordEncoder, boolean kakao){
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .profile(profile)
                .phone(phone)
                .kakao(kakao)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(email,password);
    }

    public void ChangeNickname(String newNickName){
        this.nickname = newNickName;
    }
}
