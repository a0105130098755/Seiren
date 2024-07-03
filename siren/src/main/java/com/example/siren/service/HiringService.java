package com.example.siren.service;

import com.example.siren.dto.HiringDTO;
import com.example.siren.entity.Hiring;
import com.example.siren.entity.Member;
import com.example.siren.repository.HiringRepository;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class HiringService {
    private final HiringRepository hiringRepository;
    private final MemberRepository memberRepository;

    public boolean saveHiring(HiringDTO hiringDTO){
        Optional<Member> memberOptional =
                memberRepository.findById(Long.valueOf(SecurityContextHolder
                        .getContext().getAuthentication().getName()));
        if(memberOptional.isPresent()){
            String nickname = memberOptional.get().getNickname();
            Hiring hiring = hiringDTO.toEntity(nickname);
            hiringRepository.save(hiring);
            return true;
        }else{
            return false;
        }
    }
}
