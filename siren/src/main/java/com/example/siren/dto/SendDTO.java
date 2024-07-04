package com.example.siren.dto;

import com.example.siren.entity.Send;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendDTO {
    private HiringDTO hiringDTO;
    private String nickname;
    // 0 -> 미확인
    // 1 -> 수락 상태
    // 2 -> 거절 상태
    private int status;

    @Builder
    public SendDTO(HiringDTO hiringDTO, String nickname, int status){
        this.hiringDTO = hiringDTO;
        this.nickname = nickname;
        this.status = status;
    }

    public Send toEntity(String nickname){
        return Send.builder()
                .hiring(hiringDTO.toEntity(hiringDTO.getNickname()))
                .nickname(nickname)
                .status(0)
                .build();
    }

    public static SendDTO of(Send send){
        return SendDTO.builder()
                .hiringDTO(HiringDTO.of(send.getHiring()))
                .nickname(send.getNickname())
                .status(send.getStatus())
                .build();
    }
}
