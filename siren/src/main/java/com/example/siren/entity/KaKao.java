package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @ToString
@NoArgsConstructor
public class KaKao {
    @Id
    @Column(name="id", nullable = false, unique = true)
    private Long id;

    private String email;
    private String profile;
    private String name;

    @Builder
    public KaKao(Long id, String email, String profile){
        this.id = id;
        this.email = email;
        this.profile = profile;
    }
}
