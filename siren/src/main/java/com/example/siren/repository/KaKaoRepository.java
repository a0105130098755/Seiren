package com.example.siren.repository;

import com.example.siren.entity.KaKao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KaKaoRepository extends JpaRepository <KaKao, Long> {
    Optional<KaKao> findByEmail(String email);
}
