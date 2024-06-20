package com.example.siren.service;

import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {
    private final MemberRepository memberRepository;

    public boolean existsEmail(String email){
        try{
            // 이미 있는 메일이면 true 반환
            return memberRepository.existsByEmail(email);
        }catch (Exception e){
            log.error("이메일 확인 중 에러 발생 :" + e);
            return true;
        }
    }

    public boolean existsNickname(String nickname){
        try{
            // 이미 있는 닉네임이면 true 반환
            return memberRepository.existsByEmail(nickname);
        }catch (Exception e){
            log.error("닉네임 확인 중 에러 발생 :" + e);
            return true;
        }
    }


}
