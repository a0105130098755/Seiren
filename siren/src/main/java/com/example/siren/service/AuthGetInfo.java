package com.example.siren.service;

import com.example.siren.entity.Member;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuthGetInfo {
    private final MemberRepository memberRepository;

    public Member getMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getName() != null) {
            Optional<Member> memberOptional = memberRepository.findById(Long.valueOf(authentication.getName()));
            return memberOptional.orElse(null);
        } else {
            return null; // 또는 다른 처리 방식을 선택할 수 있음
        }
    }
}
