package com.example.siren.dto;

import com.example.siren.entity.Board;
import com.example.siren.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BoardDTO {
    private Long id;
    private String title;
    private String nickname;
    private String content;
    private LocalDateTime regDate;

    @Builder
    public BoardDTO (Long id, String title, String nickname, String content, LocalDateTime regDate){
        this.id = id;
        this.title = title;
        this.nickname = nickname;
        this.content = content;
        this.regDate = regDate;
    }

    public static BoardDTO of(Board board){
        return BoardDTO.builder()
                .id(board.getId())
                .title(board.getTitle())
                .nickname(board.getMember().getNickname())
                .content(board.getContent())
                .regDate(board.getRegDate())
                .build();
    }
}
