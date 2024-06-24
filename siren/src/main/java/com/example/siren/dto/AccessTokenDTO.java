package com.example.siren.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccessTokenDTO {
    private String grantType;
    private String accessToken;
    private long accessTokenExpiresIn;
}
