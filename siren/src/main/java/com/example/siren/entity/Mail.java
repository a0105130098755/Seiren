package com.example.siren.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@NoArgsConstructor
@Table
public class Mail {
    @Id
    private String email;
    private String code;

    @Builder
    public Mail(String email, String code){
        this.email = email;
        this.code = code;
    }
}
