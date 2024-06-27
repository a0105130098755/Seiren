package com.example.siren.dto;

import com.example.siren.entity.KaKao;
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
            @JsonProperty("profile_image_url")
            private String profileImageUrl;
        }
    }

    public KaKao toEntity() {
        return KaKao.builder()
                .id(id)
                .email(kakaoAccount.getEmail())
                .profile(kakaoAccount.getProfile().getProfileImageUrl())
                .build();
    }

}
