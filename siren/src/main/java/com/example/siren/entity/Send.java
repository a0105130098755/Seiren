package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Getter
@NoArgsConstructor
public class Send {
    @Id
    @Column(name = "send_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "hiring_id")
    private Hiring hiring;
    private String nickname;
    private int status;

    @Builder
    public Send(Hiring hiring, String nickname, int status){
        this.hiring = hiring;
        this.nickname = nickname;
        this.status = status;
    }
}
