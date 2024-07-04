package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@NoArgsConstructor
@Getter
public class Receive {
    @Id
    @Column(name = "receive_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "hiring_id")
    private Hiring hiring;
    private String nickname;

    @Builder
    public Receive (Hiring hiring, String nickname){
        this.hiring = hiring;
        this.nickname = nickname;
    }
}
