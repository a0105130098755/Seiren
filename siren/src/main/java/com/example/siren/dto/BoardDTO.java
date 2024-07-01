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
    private String location;
    private String content;
    private LocalDateTime regDate;

    @Builder
    public BoardDTO (Long id, String title, String nickname,String location, String content, LocalDateTime regDate){
        this.id = id;
        this.title = title;
        this.nickname = nickname;
        this.location = location;
        this.content = content;
        this.regDate = regDate;
    }

    public static BoardDTO of(Board board){
        return BoardDTO.builder()
                .id(board.getId())
                .title(board.getTitle())
                .nickname(board.getMember().getNickname())
                .location(board.getLocation())
                .content(board.getContent())
                .regDate(board.getRegDate())
                .build();
    }

    public Board toEntity(Member member){
        return Board.builder()
                .title(title)
                .member(member)
                .content(content)
                .location(location)
                .build();
    }
}
