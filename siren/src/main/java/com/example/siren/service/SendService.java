package com.example.siren.service;

import com.example.siren.dto.SendDTO;
import com.example.siren.entity.Send;
import com.example.siren.repository.SendRepository;
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
    public List<SendDTO> sendList(int mine){
        String nickname = authGetInfo.getMember().getNickname();
        List<Send> sendList;
        // mine = 0 은 구직 입장일 때
        // else( mine != 0 ) 은 구인 입장일 때
        if(mine == 0) sendList = sendRepository.findByNickname(nickname);
        else sendList = sendRepository.findByHiringNickname(nickname);
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



    // 신청한 사람의 신청 취소 밎
    // 신청 여부 확인 후 삭제 로직
//    public boolean sendDel(SendDTO sendDTO){
//
//    }

}
