package com.example.siren.dto;

import com.example.siren.entity.Team;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TeamDTO {
    private Long id;
    private HiringDTO hiringDTO;
    private String nickname;

    @Builder
    public TeamDTO(Long id, HiringDTO hiringDTO, String nickname){
        this.id = id;
        this.hiringDTO = hiringDTO;
        this.nickname = nickname;
    }

    public static TeamDTO of(Team team){
        return TeamDTO.builder()
                .id(team.getId())
                .hiringDTO(HiringDTO.of(team.getHiring()))
                .nickname(team.getNickname())
                .build();
    }
}
