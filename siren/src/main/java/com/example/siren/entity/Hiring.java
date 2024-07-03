package com.example.siren.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
@Getter
@ToString
@NoArgsConstructor
public class Hiring {
    @Id
    @Column(name = "hiring_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="nickname")
    private Member member;

}
