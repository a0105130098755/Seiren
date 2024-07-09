package com.example.siren.service;

import com.example.siren.dto.KakaoDTO;
import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.dto.TokenDTO;
import com.example.siren.dto.TokenResponseDTO;
import com.example.siren.entity.Member;
import com.example.siren.jwt.TokenProvider;
import com.example.siren.repository.MemberRepository;
import com.example.siren.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KaKaoService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

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

            MemberRequestDTO memberDTO = MemberRequestDTO.builder()
                    .email(kakaoDto.getKakaoAccount().getEmail())
                    .name(kakaoDto.getKakaoAccount().getProfile().getNickname())
                    .nickname(kakaoDto.getKakaoAccount().getProfile().getNickname())
                    .profile(kakaoDto.getKakaoAccount().getProfile().getProfile())
                    .password(String.valueOf(kakaoDto.getId()))
                    .nickname(kakaoDto.getKakaoAccount().getProfile().getNickname())
                    .build();
            // 이미 가입된 이메일이 있다면
            if(optionalMember.isPresent()){
                // 가입된 이메일이 내 카카오 아이디와 맞다면
                if(optionalMember.get().getPassword().matches(String.valueOf(kakaoDto.getId()))) {
                    log.info("바로 카카오 로그인 합니다.");
                    return authService.login(memberDTO);
                } else return null;

            }

            // 카카오 계정은 kakao 필드 true로 저장.
            memberRepository.save(memberDTO.toEntity(passwordEncoder, true));
            log.info(memberDTO.toString());

            // 바로 들어온 값으로 로그인
            return authService.login(memberDTO);
        } catch (Exception e) {
            log.error("카카오 서비스 오류 발생" + e);
            return null;
        }
    }
}


