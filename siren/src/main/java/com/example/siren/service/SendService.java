package com.example.siren.service;

import com.example.siren.dto.SendDTO;
import com.example.siren.entity.Send;
import com.example.siren.entity.Team;
import com.example.siren.repository.SendRepository;
import com.example.siren.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SendService {
    private final SendRepository sendRepository;
    private final TeamRepository teamRepository;
    private final AuthGetInfo authGetInfo;


    // 구직 신청
    public boolean sendHiring(SendDTO sendDTO){
        String nickname = authGetInfo.getMember().getNickname();
        if(!nickname.isEmpty()) {
            Send send = sendDTO.toEntity(nickname);
            sendRepository.save(send);
            // 제대로 신청이 들어감
            return true;
        }
        else {
            return false;
        }
    }
    
    // 구직 신청한 내역 조회
    public List<SendDTO> sendList(int i){
        String nickname = authGetInfo.getMember().getNickname();
        List<Send> sendList;
        // i = 0 은 구직 입장에서 조회
        // else( i != 0 ) 은 구인 입장에서 조회
        if(i == 0) sendList = sendRepository.findByNickname(nickname);
        else sendList = sendRepository.findByHiringNickname(nickname);
        List<SendDTO> sendDTOS = new ArrayList<>();
        if(!sendList.isEmpty()){
            for(Send s : sendList){
                SendDTO sendDTO = SendDTO.of(s);
                // i 가 0 일 때에는 구직 입장. status 0, 1, 2 모든 상태 출력해야한다
                // 하지만 i 가 != 은 구인 입장. 즉 자신이 수락, 거절한 건 볼 필요 없고
                // status 가 0 인 내역만 조회하면 된다.
                if(i != 0) {
                    if (s.getStatus() == 0) sendDTOS.add(sendDTO);
                }
                else sendDTOS.add(sendDTO);
            }
            return sendDTOS;
        }
        return null;
    }
    
    // 구직 상태 변경
    public boolean statusTrue(SendDTO sendDTO){
        String nickname = authGetInfo.getMember().getNickname();
        if(nickname.equals(sendDTO.getHiringDTO().getNickname())){
            // status 1 은 수락. 따라서 send 한 hiring 과 nickname 을 Team 에 저장
            if(sendDTO.getStatus() == 1){
                teamRepository.save(
                        Team.builder()
                                .hiring(sendDTO.getHiringDTO().toEntity(sendDTO.getNickname()))
                                .nickname(sendDTO.getNickname())
                                .build()
                );
            }
            // status 2 는 거절 상태. front 에서 로직 구현
            Send send = sendDTO.toEntity(sendDTO.getNickname());
            sendRepository.save(send);
            // 변경 완료
            return true;
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
