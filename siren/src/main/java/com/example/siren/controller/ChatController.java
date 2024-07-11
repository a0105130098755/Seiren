package com.example.siren.controller;

import com.example.siren.dto.ChatRoomDTO;
import com.example.siren.dto.MemberDTO;
import com.example.siren.dto.MemberResponseDTO;
import com.example.siren.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/list")
    public List<ChatRoomDTO> findAllRoom(){
        return chatService.findAllRoom();
    }

    @GetMapping("/memberInfo")
    public MemberResponseDTO memberDTO (){
        return chatService.getMemberInfo();
    }
}
