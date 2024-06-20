package com.example.siren.repository;

import com.example.siren.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Slf4j
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    void createMember() {
        Member member = Member.builder()
                .email("test@naver.com")
                .password("pwd")
                .name("name")
                .nickname("nickname")
                .build();
        memberRepository.save(member);
    }

    @Test
    @DisplayName("이메일 중복 테스트")
    void existByEmailTest(){
        this.createMember();
        boolean isExist =  memberRepository.existsByEmail("test@naver.com");
        log.info("테스트 결과 : " +isExist);
    }

    @Test
    @DisplayName("닉네임 중복 테스트")
    void existByNicknameTest(){
        this.createMember();
        boolean isExist = memberRepository.existsByNickname("nickname");
        log.info("테스트 결과 : " +isExist);
    }

}