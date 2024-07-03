package com.example.siren.repository;

import com.example.siren.entity.Hiring;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiringRepository extends JpaRepository<Hiring, Long> {
    Page<Hiring> findAll(Pageable pageable);
    Page<Hiring> findByTitleContaining(String title, Pageable pageable);
    List<Hiring> findByNicknameContaining(String nickname);

    void deleteById(Long id);

}
