package com.example.siren.controller;

import com.example.siren.dto.HiringDTO;
import com.example.siren.service.HiringService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hiring")
@RequiredArgsConstructor
@Slf4j
public class HiringController {
    private final HiringService hiringService;

    @PostMapping("/save")
    public ResponseEntity<Boolean> saveHiring(@RequestBody HiringDTO hiringDTO){
        return ResponseEntity.ok(hiringService.saveHiring(hiringDTO));
    }
}
