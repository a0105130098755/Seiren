package com.example.siren.repository;

import com.example.siren.entity.Send;
import com.example.siren.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {
    @Query("SELECT t FROM Team t where t.hiring.id = :id")
    List<Send> findByHiringId(@Param("id")Long id);
    Optional<Team> findByNickname(String nickname);

}
