package com.example.siren.service;

import com.example.siren.dto.KakaoDTO;
import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.dto.TokenResponseDTO;
import com.example.siren.entity.Member;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KaKaoService {
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final ChatService chatService;

    public TokenResponseDTO kakaoUserInfo(String kakaoToken) {
        Map<String, Object> kakaoInfo = new HashMap<>();
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
            Optional<Member> optionalMember = memberRepository.findByEmail(kakaoDto.getKakaoAccount().getEmail());

            String kakaoNickname = kakaoDto.getKakaoAccount().getProfile().getNickname();
            Optional<Member> optionalMember2 = memberRepository.findByNickname(kakaoNickname);

            List<Member> memberList = memberRepository.findAll();
            Set<String> existingNickname = memberList.stream().map(Member::getNickname).collect(Collectors.toSet());
            Random random = new Random();


            MemberRequestDTO memberDTO = MemberRequestDTO.builder()
                    .email(kakaoDto.getKakaoAccount().getEmail())
                    .name(kakaoDto.getKakaoAccount().getProfile().getNickname())
                    .nickname(kakaoNickname)
                    .profile(kakaoDto.getKakaoAccount().getProfile().getProfile())
                    .password(String.valueOf(kakaoDto.getId()))
                    .nickname(kakaoDto.getKakaoAccount().getProfile().getNickname())
                    .build();
            // 이미 가입된 이메일이 있다면
            if(optionalMember.isPresent()){
                // 가입된 이메일이 내 카카오 아이디와 맞다면
                if(passwordEncoder.matches(String.valueOf(kakaoDto.getId()),
                        optionalMember.get().getPassword())) {
                    log.info("바로 카카오 로그인 합니다.");
                    return authService.login(memberDTO);
                } else return null;

            }
            // 해당 닉네임이 사용중이라면
            if(optionalMember2.isPresent()){
                while(existingNickname.contains(kakaoNickname)){
                    int randomNum = random.nextInt(10000);
                    kakaoNickname = kakaoNickname + randomNum;
                }
                memberDTO.ChangeNickname(kakaoNickname);
            }

            // 카카오 계정은 kakao 필드 true로 저장.
            memberRepository.save(memberDTO.toEntity(passwordEncoder, true));
            chatService.createRoom(memberDTO.toEntity(passwordEncoder, true));
            log.info(memberDTO.toString());

            // 바로 들어온 값으로 로그인
            return authService.login(memberDTO);
        } catch (Exception e) {
            log.error("카카오 서비스 오류 발생" + e);
            return null;
        }
    }
}


