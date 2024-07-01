package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table
@ToString
public class Comment {
    @Id
    @Column(name="comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;

    private String nickname;
    private String content;
    private LocalDateTime reg_date;

    @Builder
    public Comment(Board board, String nickname, String content){
        this.board = board;
        this.nickname = nickname;
        this.content = content;
        this.reg_date = LocalDateTime.now();
    }
}
