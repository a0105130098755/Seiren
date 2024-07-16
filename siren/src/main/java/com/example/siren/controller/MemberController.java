package com.example.siren.controller;

import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateMember (@RequestBody MemberRequestDTO memberRequestDTO){
        return ResponseEntity.ok(memberService.updateInfo(memberRequestDTO));
    }
}
