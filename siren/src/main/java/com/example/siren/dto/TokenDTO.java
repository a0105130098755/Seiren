package com.example.siren.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDTO {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn; // 토큰 만료 시간
    private String refreshToken; // refreshToken
    private Long refreshTokenExpiresIn; // refreshToken 만료 시간
}
