package com.example.siren.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class KakaoDTO {
    private Long id;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Data
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        @Data
        public static class Profile {
            private String nickname;
            @JsonProperty("profile_image_url")
            private String profile;
        }
    }

    public Kakao toEntity() {
        return Kakao.builder()
                .id(id)
                .email(kakaoAccount.getEmail())
                .nickname(kakaoAccount.getProfile().getNickname())
                .profile(kakaoAccount.getProfile().getProfile())
                .build();
    }

}
