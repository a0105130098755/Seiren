package com.example.siren.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KaKaoRepository extends JpaRepository <Kakao, Long> {
    Optional<Kakao> findByEmail(String email);
}
