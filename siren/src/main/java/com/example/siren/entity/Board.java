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
    @JoinColumn(name="nickname")
    private Member member;
    private String profile;
    private String title;
    @Lob
    @Column(length = 500)
    private String content;
    private LocalDateTime regDate;

    @Builder
    public Board (Member member, String title, String content){
        this.member = member;
        this.profile = member.getProfile();
        this.title = title;
        this.content = content;
        this.regDate = LocalDateTime.now();
    }
}
