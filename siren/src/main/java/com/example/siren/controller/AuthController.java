package com.example.siren.controller;

import com.example.siren.dto.*;
import com.example.siren.entity.Token;
import com.example.siren.service.AuthService;
import com.example.siren.service.KaKaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Access;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final KaKaoService kakaoService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
        // 500 에러 -> 이미 가입된 이메일
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/reissued")
    public ResponseEntity<AccessTokenDTO> newToken(@RequestBody String refreshToken){
        log.info("refreshToken 값 : {}", refreshToken);
        return ResponseEntity.ok(authService.reissuedToken(refreshToken));
    }

    @GetMapping("/sendmail")
    public ResponseEntity<String> mailCode(@RequestParam String email){
        String code = authService.sendMail(email);
        log.info("메일 : " + email + " / 코드 : " + code);
        return ResponseEntity.ok(code);
    }

    @PostMapping("/checkExist")
    public ResponseEntity<Boolean> nicknameCheck(@RequestBody CheckExistDTO existDTO){
        boolean isExist = true;
        String type = existDTO.getType();
        String value = existDTO.getValue();
        if(type.equals("email")){
            log.info("이메일 중복 체크 : " + value);
            isExist = authService.existsEmail(value);
        }
        if(type.equals("phone")){
            log.info("전화번호 중복 체크 : " + value);
            isExist = authService.existsPhone(value);
        }
        if(type.equals("nickname")){
            log.info("닉네임 중복 체크 : " + value);
            isExist = authService.existsPhone(value);
        }
        return ResponseEntity.ok(isExist);
    }

    @PostMapping("/kakao")
    public ResponseEntity<TokenDTO> kakaoLogin(@RequestBody Map<String,String> accessToken){
        log.info("카카오 토근 : {}", accessToken.get("token"));
        TokenDTO response = kakaoService.kakaoUserInfo(accessToken.get("token"));
        log.info("response : {}" , response);
        return ResponseEntity.ok(response);
        // 500에러 -> 이미 가입된 이메일
    }

}
