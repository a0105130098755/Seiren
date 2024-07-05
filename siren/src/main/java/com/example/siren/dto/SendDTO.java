package com.example.siren.dto;

import com.example.siren.entity.Hiring;
import com.example.siren.entity.Send;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendDTO {
    private Long id;
    private HiringDTO hiringDTO;
    private String nickname;
    // 0 -> 미확인
    // 1 -> 수락 상태
    // 2 -> 거절 상태
    private int status;

    @Builder
    public SendDTO(Long id, HiringDTO hiringDTO, String nickname, int status){
        this.id = id;
        this.hiringDTO = hiringDTO;
        this.nickname = nickname;
        this.status = status;
    }

    public Send toEntity(String nickname, Hiring hiring){
        return Send.builder()
                .hiring(hiring)
                .nickname(nickname)
                .status(0)
                .build();
    }

    public static SendDTO of(Send send){
        return SendDTO.builder()
                .id(send.getId())
                .hiringDTO(HiringDTO.of(send.getHiring()))
                .nickname(send.getNickname())
                .status(send.getStatus())
                .build();
    }
}
