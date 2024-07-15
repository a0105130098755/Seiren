package com.example.siren.repository;

import com.example.siren.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 회원 정보에 관련된 DB 작업들
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    boolean existsByPhone(String phone);

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long id);

    Optional<Member> findByNickname(String nickname);

}
