package com.example.siren.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@ToString
@NoArgsConstructor
@Setter
public class Hiring {
    @Id
    @Column(name = "hiring_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nickname;
    private String title;
    private String content;
    private int current;
    private int max;
    private String location;

    @Builder
    public Hiring(String nickname, String title, String content, int current, int max, String location){
        this.nickname = nickname;
        this.title = title;
        this.content = content;
        this.current = current;
        this.max = max;
        this.location = location;

    }

}
