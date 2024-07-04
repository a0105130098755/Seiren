package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Getter
@NoArgsConstructor
public class Team {
    @Id
    @Column(name = "team_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "hiring_id")
    private Hiring hiring;
    private String nickname; // 소속 인원 닉네임

    @Builder
    public Team (Hiring hiring, String nickname){
        this.hiring = hiring;
        this.nickname = nickname;
    }
}
