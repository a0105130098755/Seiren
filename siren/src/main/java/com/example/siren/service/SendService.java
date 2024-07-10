package com.example.siren.service;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.SendDTO;
import com.example.siren.entity.Hiring;
import com.example.siren.entity.Send;
import com.example.siren.entity.Team;
import com.example.siren.repository.HiringRepository;
import com.example.siren.repository.SendRepository;
import com.example.siren.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SendService {
    private final SendRepository sendRepository;
    private final TeamRepository teamRepository;
    private final HiringRepository hiringRepository;
    private final AuthGetInfo authGetInfo;


    // 구직 신청
    public boolean sendHiring(SendDTO sendDTO){
        String nickname = authGetInfo.getMember().getNickname();
        List<Send> sends  = sendRepository.findByHiringId(sendDTO.getHiringDTO().getId());
        for(Send send : sends){
            // 같은 신청이 있을 때 처리할 로직
            if(sendDTO.getHiringDTO().getId() == send.getHiring().getId()){
                // 같은 구인 글에
                // 지금 로그인한 사람이 신청한 게 있다면
                if(send.getNickname().equals(nickname)) return false;
            }
        }
        if(!nickname.isEmpty()) {
            log.warn("!nickname.isEmpty 통과 ");
            Optional<Hiring> hiringOptional = hiringRepository.findById(sendDTO.getHiringDTO().getId());
            log.warn("optional hiring data : {}" , hiringOptional);
            Hiring hiring = hiringOptional.get();
            Send send = sendDTO.toEntity(nickname,hiring);
            sendRepository.save(send);
            // 제대로 신청이 들어감
            return true;
        }
        else {
            return false;
        }
    }
    
    // 구직 신청한 내역 조회
    public List<SendDTO> sendList(){
        String nickname = authGetInfo.getMember().getNickname();
        List<Send> sendList;
        sendList = sendRepository.findByNickname(nickname);
        List<SendDTO> sendDTOS = new ArrayList<>();
        if(!sendList.isEmpty()){
            for(Send s : sendList){
                SendDTO sendDTO = SendDTO.of(s);
                sendDTOS.add(sendDTO);
            }
            return sendDTOS;
        }
        return null;
    }

    //구인 내역 조회
    public List<SendDTO> sendList(HiringDTO hiringDTO){
        String nickname = authGetInfo.getMember().getNickname();
        List<Send> sendList;
        sendList = sendRepository.findByHiringNickname(nickname);
        if(sendList.isEmpty()) return null;
        log.warn("내 닉네임으로 작성된 글의 신청 목록 : {}", sendList.get(0).getId());
        List<SendDTO> sendDTOS = new ArrayList<>();
        if(!sendList.isEmpty()){
            log.warn("!sendList.isEmpty 통과");
            for(Send s : sendList){
                SendDTO sendDTO = SendDTO.of(s);
                if(sendDTO.getHiringDTO().getId() == hiringDTO.getId()) {
                    log.warn("getHiringDTO().getId() 통과");
                    sendDTOS.add(sendDTO);
                }
            }
            return sendDTOS;
        }
        return null;
    }
    
    // 구직 상태 변경
    public boolean statusTrue(SendDTO sendDTO){
        String nickname = authGetInfo.getMember().getNickname();
        Optional<Hiring> hiring = hiringRepository.findById(sendDTO.getHiringDTO().getId());
        if(nickname.equals(sendDTO.getHiringDTO().getNickname())){
            // status 1 은 수락. 따라서 send 한 hiring 과 nickname 을 Team 에 저장
            if(sendDTO.getStatus() == 1){
                // 수락 할 때 이미 인원이 다 찼다면
                if(sendDTO.getHiringDTO().getCurrent() == sendDTO.getHiringDTO().getMax()) return false;
                teamRepository.save(
                        Team.builder()
                                .hiring(hiring.get())
                                .nickname(sendDTO.getNickname())
                                .build()
                );
                Hiring hiringUpdate = hiring.get();
                hiringUpdate.setCurrent(hiringUpdate.getCurrent()+1);
                hiringRepository.save(hiringUpdate);
            }
            // status 2 는 거절 상태. front 에서 로직 구현
            Optional<Send> sendOptional = sendRepository.findById(sendDTO.getId());
            if(sendOptional.isPresent()) {
                sendRepository.save(sendOptional.get().updateEntity(sendDTO));
                return true;
            }
            else return false;
        }
            // 변경 실패
        return false;
    }

    // 신청한 사람의 신청 취소 및 팀 구성된 팀 확인 시 삭제
    public boolean sendDel(SendDTO sendDTO){
        String nickname = authGetInfo.getMember().getNickname();
        if(nickname.equals(sendDTO.getNickname())){
            sendRepository.deleteById(sendDTO.getId());
            // 삭제 성공
            return true;
        }
        return false;
    }

}
