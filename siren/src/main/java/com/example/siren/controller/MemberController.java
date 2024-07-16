package com.example.siren.controller;

import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/disabled")
    public ResponseEntity<Boolean> disabledMember(){
        return ResponseEntity.ok(memberService.memberDisabled());
    }
}
