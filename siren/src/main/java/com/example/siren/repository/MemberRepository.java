package com.example.siren.repository;

import com.example.siren.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 회원 정보에 관련된 DB 작업들
    // 회원가입 ( 이메일 존재 여부, 닉네임 존재 여부, 회원 가입 데이터 저장)
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

}
