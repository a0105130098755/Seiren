package com.example.siren.repository;

import com.example.siren.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailRepository extends JpaRepository<Mail, String> {
    // 메일 인증에 사용될 이메일에 발송된 메일 조회
    List<Mail> findByEmail(String email);
    void deleteByEmail(String email);
}
