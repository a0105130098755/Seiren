package com.example.siren.dto;

import com.example.siren.entity.Hiring;
import com.example.siren.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HiringDTO {
    private long id;
    private String title;
    private String nickname;
    private String content;
    private int current;
    private int max;
    private String location;

    @Builder
    public HiringDTO (long id,String title, String nickname, String content, int current, int max, String location){
        this.id = id;
        this.title = title;
        this.nickname = nickname;
        this.content = content;
        this.current = current;
        this.max = max;
        this.location = location;

    }

    public static HiringDTO of(Hiring hiring){
        return HiringDTO.builder()
                .id(hiring.getId())
                .title(hiring.getTitle())
                .nickname(hiring.getNickname())
                .content(hiring.getContent())
                .current(hiring.getCurrent())
                .max(hiring.getMax())
                .location(hiring.getLocation())
                .build();
    }

    public Hiring toEntity (String nickname){
        return Hiring.builder()
                .nickname(nickname)
                .title(title)
                .content(content)
                .current(current)
                .max(max)
                .location(location)
                .build();
    }



}
