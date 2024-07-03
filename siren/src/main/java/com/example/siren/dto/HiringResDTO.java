package com.example.siren.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class HiringResDTO {
    private List<HiringDTO> hiringDTOS;
    private int size;

    @Builder
    public HiringResDTO(List<HiringDTO> hiringDTOS, int size){
        this.hiringDTOS = hiringDTOS;
        this.size = size;
    }
}
