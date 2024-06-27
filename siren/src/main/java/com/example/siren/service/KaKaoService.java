package com.example.siren.service;

import com.example.siren.dto.KakaoDTO;
import com.example.siren.repository.KaKaoRepository;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KaKaoService {
    private final MemberRepository memberRepository;
    private final KaKaoRepository kakaoRepository;
    private final RestTemplate restTemplate;

    public Map<String, Object> kakaoUserInfo(String kakaoToken){
        Map<String,Object> kakaoInfo = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization", "Bearer " + kakaoToken);

        String url = "https://kapi.kakao.com/v2/user/me";

        try {
            ResponseEntity<KakaoDTO> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    KakaoDTO.class
            );
            KakaoDTO kakaoDto = responseEntity.getBody();
            log.info(kakaoDto.toString());
            log.info("id : {}", kakaoDto.getId());
            log.info("email : {}" , kakaoDto.getKakaoAccount().getEmail());
            log.info("profile : {}", kakaoDto.getKakaoAccount().getProfile().getProfile());
            log.info("nickname : {}" , kakaoDto.getKakaoAccount().getProfile().getNickname());
            return kakaoInfo;
        }catch(Exception e) {
            log.error("카카오 서비스 오류 발생" + e);
            return null;
        }
    }
}
