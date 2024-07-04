package com.example.siren.service;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.SendDTO;
import com.example.siren.entity.Send;
import com.example.siren.repository.SendRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SendService {
    private final SendRepository sendRepository;
    private final AuthGetInfo authGetInfo;

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

}
