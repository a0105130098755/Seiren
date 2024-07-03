package com.example.siren.repository;

import com.example.siren.entity.Hiring;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HiringRepository extends JpaRepository<Hiring, Long> {
    Page<Hiring> findAll(Pageable pageable);
    Page<Hiring> findByTitleContaining(String title, Pageable pageable);
    Page<Hiring> findByNicknameContaining(String nickname, Pageable pageable);

    void deleteById(Long id);

}
