package com.example.siren.controller;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.SendDTO;
import com.example.siren.service.SendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("/send")
@RequiredArgsConstructor
public class SendController {
    private final SendService sendService;

    @GetMapping("/send")
    public ResponseEntity<List<SendDTO>> sendList(){
        return ResponseEntity.ok(sendService.sendList());
    }

    @PostMapping("/receive")
    public ResponseEntity<List<SendDTO>> receiveList(@RequestBody HiringDTO hiringDTO){

        return ResponseEntity.ok(sendService.sendList(hiringDTO));
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> sendHiring(@RequestBody SendDTO sendDTO){

        return ResponseEntity.ok(sendService.sendHiring(sendDTO));
    }

    @PostMapping("/status")
    public ResponseEntity<Boolean> setStatus(@RequestBody SendDTO sendDTO){

        return ResponseEntity.ok(sendService.statusTrue(sendDTO));
    }

    @PostMapping("/ok")
    public ResponseEntity<Boolean> statusCheck(@RequestBody SendDTO sendDTO){
        return ResponseEntity.ok(sendService.sendDel(sendDTO));
    }


}
