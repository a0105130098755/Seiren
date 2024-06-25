package com.example.siren.dto;

import com.example.siren.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDTO {
    private String name;
    private String nickname;
    private String email;
    private String profile;
    private String phone;
    private int point;
    private LocalDateTime regDate;

    // Member 객체를 MemberResponseDTO 객체로 변환하는 역할
    public static MemberResponseDTO of(Member member){
        return MemberResponseDTO.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profile(member.getProfile())
                .nickname(member.getNickname())
                .point(member.getPoint())
                .regDate(member.getRegDate())
                .build();
    }
}
