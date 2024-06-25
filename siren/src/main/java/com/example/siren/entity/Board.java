package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table
@ToString
@NoArgsConstructor
public class Board {
    @Id
    @Column(name="board_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_nickname")
    private Member member;

    private String title;
    private String location;
    @Lob
    @Column(length = 500)
    private String content;
    private LocalDateTime regDate;

    @Builder
    public Board (Member member, String title, String location, String content){
        this.member = member;
        this.title = title;
        this.location = location;
        this.content = content;
        this.regDate = LocalDateTime.now();
    }
}
