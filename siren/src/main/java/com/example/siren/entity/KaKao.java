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
    private String nickname;

    @Builder
    public KaKao(Long id, String email, String profile, String nickname){
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.profile = profile;
    }
}
