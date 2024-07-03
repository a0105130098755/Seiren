package com.example.siren.service;

import com.example.siren.entity.Member;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@RequiredArgsConstructor
public class AuthGetInfo {
    private final MemberRepository memberRepository;

    public Member getMember(){
        Optional<Member> memberOptional = memberRepository
                .findById(Long.valueOf(SecurityContextHolder
                                        .getContext()
                                        .getAuthentication()
                                        .getName()));
        return memberOptional.orElse(null);
    }
}
