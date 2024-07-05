package com.example.siren.controller;

import com.example.siren.dto.SendDTO;
import com.example.siren.service.SendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public List<SendDTO> sendList(){
        return sendService.sendList(0);
    }

    @GetMapping("/receive")
    public List<SendDTO> receiveList(){
        return sendService.sendList(1);
    }

    @PostMapping("/save")
    public boolean sendHiring(@RequestBody SendDTO sendDTO){
        return sendService.sendHiring(sendDTO);
    }

    @PostMapping("/status")
    public boolean setStatus(@RequestBody SendDTO sendDTO){
        return sendService.statusTrue(sendDTO);
    }

    @PostMapping("/ok")
    public boolean statusCheck(@RequestBody SendDTO sendDTO){
        return sendService.sendDel(sendDTO);
    }


}
