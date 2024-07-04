package com.example.siren.repository;

import com.example.siren.entity.Send;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SendRepository extends JpaRepository<Send,Long> {
    void deleteById(Long id);
    List<Send> findByNickname(String nickname);

    @Query("SELECT s FROM send s where s.hiring.nickname = :nickname")
    List<Send> findByHiringNickname(@Param("nickname")String nickname);
}
