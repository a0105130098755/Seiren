package com.example.siren.dto;

import com.example.siren.entity.Board;
import com.example.siren.entity.Comment;
import com.example.siren.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private BoardDTO boardDTO;
    private String nickname;
    private String content;


    @Builder
    public CommentDTO(Long id, BoardDTO boardDTO, String nickname, String content){
        this.id = id;
        this.boardDTO = boardDTO;
        this.nickname = nickname;
        this.content = content;
    }

    public static CommentDTO of(Comment comment){
        return CommentDTO.builder()
                .id(comment.getId())
                .nickname(comment.getNickname())
                .content(comment.getContent())
                .build();
    }

    public Comment toEntity(String inputNickname, Board board){
        return Comment.builder()
                .board(board)
                .nickname(inputNickname)
                .content(content)
                .build();
    }

}
