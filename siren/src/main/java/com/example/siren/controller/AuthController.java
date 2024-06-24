package com.example.siren.controller;

import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.dto.MemberResponseDTO;
import com.example.siren.dto.TokenDTO;
import com.example.siren.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/reissued")
    public ResponseEntity<TokenDTO> newToken(@RequestBody String refreshToken){
        log.info("refreshToken 값 : {}", refreshToken);
        return ResponseEntity.ok(authService.reissuedToken(refreshToken));
    }

    @GetMapping("/sendmail")
    public ResponseEntity<String> mailCode(@RequestParam String email){
        String code = authService.sendMail(email);
        log.info("메일 : " + email + " / 코드 : " + code);
        return ResponseEntity.ok(code);
    }



}
