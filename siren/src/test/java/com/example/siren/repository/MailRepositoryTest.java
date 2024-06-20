package com.example.siren.repository;

import com.example.siren.entity.Mail;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import javax.transaction.Transactional;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Slf4j
@Transactional
class MailRepositoryTest {

    @Autowired
    MailRepository mailRepository;

    void createMail(){
        Mail mail = Mail.builder()
                .email("test@naver.com")
                .code("1234")
                .build();
        mailRepository.save(mail);
    }

    @Test
    void findByEmail() {
        this.createMail();
        Optional<Mail> mail = mailRepository.findByEmail("test@naver.com");
        if(mail.isPresent()){
            Mail mailCheck = mail.get();
            log.info("발송된 메일 번호 : " + mailCheck.getCode());
        }
    }

    @Test
    void deleteByEmail() {
        this.createMail();
        mailRepository.deleteByEmail("test@naver.com");
        boolean isDel = mailRepository.existsByEmail("test@naver.com");
        log.info("메일 삭제 테스트 확인(false 시 삭제 성공) : " + isDel);
    }
}