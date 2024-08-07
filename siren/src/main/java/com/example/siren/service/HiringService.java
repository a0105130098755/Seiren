package com.example.siren.service;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.HiringResDTO;
import com.example.siren.dto.TeamDTO;
import com.example.siren.entity.Hiring;
import com.example.siren.entity.Member;
import com.example.siren.entity.Team;
import com.example.siren.repository.HiringRepository;
import com.example.siren.repository.TeamRepository;
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
    private final TeamRepository teamRepository;
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
        nickname = nickname.trim();
        Pageable pageable = PageRequest.of(page,size);
        Page<Hiring> hiringList;
        if(nickname.isEmpty()) {
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

    public HiringResDTO searchTitle(String title, int page, int size){
        title = title.trim();
        log.warn("title : [{}]", title);
        Pageable pageable = PageRequest.of(page,size);
        Page<Hiring> hiringList;
        if(title.isEmpty()){
            hiringList = hiringRepository.findAll(pageable);
        }else{
            hiringList = hiringRepository.findByTitleContaining(title, pageable);
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

    public List<TeamDTO> teamList(HiringDTO hiringDTO){
        log.warn("hiringDTO 가져온 값 : {}", hiringDTO.getId());
        List<Team> teamList = teamRepository.findByHiringId(hiringDTO.getId());
        List<TeamDTO> teamDTOS = new ArrayList<>();
        for(Team t : teamList){
            TeamDTO teamDTO = TeamDTO.builder()
                    .id(t.getId())
                    .hiringDTO(HiringDTO.of(t.getHiring()))
                    .nickname(t.getNickname())
                    .build();
            teamDTOS.add(teamDTO);
        }
        return teamDTOS;
    }

    public boolean kickTeam(TeamDTO teamDTO){
        String nickName = authGetInfo.getMember().getNickname();
        // 만약 로그인한 유저가 글쓴이가 맞다면
        if(nickName.equals(teamDTO.getHiringDTO().getNickname())) {
            Hiring hiring = hiringRepository.findById(teamDTO.getHiringDTO().getId()).get();
            hiring.setCurrent(hiring.getCurrent()-1);
            hiringRepository.save(hiring);
            teamRepository.deleteById(teamDTO.getId());
            return true;
        }
        else return false;

    }
}
