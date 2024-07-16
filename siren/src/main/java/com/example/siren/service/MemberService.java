package com.example.siren.service;

import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.entity.Member;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {
    private final AuthGetInfo authGetInfo;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;


    public boolean updateInfo(MemberRequestDTO memberDTO){
        Member member = authGetInfo.getMember();
        if(memberDTO.getNickname()!=null){
            Optional<Member> optional = memberRepository.findByNickname(memberDTO.getNickname());
            if(optional.isPresent()) {
                log.warn("이미 사용중 닉네임");
                return false;
            }
            member.updateNickname(memberDTO.getNickname());
        }
        if(memberDTO.getPassword() != null){
            member.updatePassword(passwordEncoder,memberDTO.getPassword());
        }
        return true;
    }
}
