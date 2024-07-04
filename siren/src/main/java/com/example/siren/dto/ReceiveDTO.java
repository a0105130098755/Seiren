package com.example.siren.dto;

import com.example.siren.entity.Receive;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReceiveDTO {
    private HiringDTO hiringDTO;
    private String nickname;

    @Builder
    public ReceiveDTO (HiringDTO hiringDTO, String nickname){
        this.hiringDTO = hiringDTO;
        this.nickname = nickname;
    }

    public static ReceiveDTO of(Receive receive){
        return ReceiveDTO.builder()
                .hiringDTO(HiringDTO.of(receive.getHiring()))
                .nickname(receive.getNickname())
                .build();
    }

    public Receive toEntity(){
        return Receive.builder()
                .hiring(hiringDTO.toEntity(hiringDTO.getNickname()))
                .nickname(nickname)
                .build();
    }
}
