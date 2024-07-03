package com.example.siren.controller;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.HiringResDTO;
import com.example.siren.service.HiringService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search")
    public ResponseEntity<HiringResDTO> searchHiring(@RequestParam String nickname,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10")int size){
        return ResponseEntity.ok(hiringService.search(nickname, page, size));
    }
}
