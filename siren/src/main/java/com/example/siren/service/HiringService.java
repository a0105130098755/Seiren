package com.example.siren.service;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.HiringResDTO;
import com.example.siren.entity.Hiring;
import com.example.siren.entity.Member;
import com.example.siren.repository.HiringRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class HiringService {
    private final HiringRepository hiringRepository;
    private final AuthGetInfo authGetInfo;

    public boolean saveHiring(HiringDTO hiringDTO){
        Member member = authGetInfo.getMember();
        if(member != null){
            String nickname = member.getNickname();
            if(hiringRepository.findByNickname(nickname).size()>=4) return false;
            Hiring hiring = hiringDTO.toEntity(nickname);
            hiringRepository.save(hiring);
            return true;
        }else{
            return false;
        }
    }

    public HiringResDTO search(String nickname, int page, int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Hiring> hiringList;
        if(nickname.equals("all")) {
            hiringList = hiringRepository.findAll(pageable);
        }else{
            hiringList = hiringRepository.findByNicknameContaining(nickname,pageable);
        }
        List<HiringDTO> hiringDTOS = new ArrayList<>();
        for(Hiring h : hiringList){
            HiringDTO hiringDTO = HiringDTO.of(h);
            hiringDTOS.add(hiringDTO);
        }

        return HiringResDTO.builder()
                .hiringDTOS(hiringDTOS)
                .size(hiringList.getTotalPages())
                .build();
    }

    public List<HiringDTO> myHiring(){
        String nickname = authGetInfo.getMember().getNickname();
        List<Hiring>hiringList = hiringRepository.findByNickname(nickname);
        List<HiringDTO> hiringDTOS = new ArrayList<>();
        for(Hiring h : hiringList){
            HiringDTO hiringDTO = HiringDTO.of(h);
            hiringDTOS.add(hiringDTO);
        }
        return hiringDTOS;
    }

    public boolean delHiring(HiringDTO hiringDTO){
        String nickname = authGetInfo.getMember().getNickname();
        if(nickname != null){
            if(nickname.equals(hiringDTO.getNickname())){
                hiringRepository.deleteById(hiringDTO.getId());
                return true;
            }
        }
        return false;
    }

}
