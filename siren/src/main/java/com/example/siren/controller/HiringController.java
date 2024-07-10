package com.example.siren.controller;

import com.example.siren.dto.HiringDTO;
import com.example.siren.dto.HiringResDTO;
import com.example.siren.dto.TeamDTO;
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

    @GetMapping("/myHiring")
    public ResponseEntity<List<HiringDTO>> myHiring(){
        return ResponseEntity.ok(hiringService.myHiring());
    }

    @GetMapping("/searchName")
    public ResponseEntity<HiringResDTO> searchNickname(@RequestParam String nickname,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "9")int size){
        return ResponseEntity.ok(hiringService.search(nickname, page, size));
    }

    @GetMapping("/searchTitle")
    public ResponseEntity<HiringResDTO> searchTitle(@RequestParam String title,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "9")int size) {
            return ResponseEntity.ok(hiringService.searchTitle(title, page, size));
    }


    @PostMapping("/delete")
    public ResponseEntity<Boolean> delHiring(@RequestBody HiringDTO hiringDTO){
        return ResponseEntity.ok(hiringService.delHiring(hiringDTO));
    }

    @PostMapping("/teamList")
    public ResponseEntity<List<TeamDTO>> teamList(@RequestBody HiringDTO hiringDTO){
        return ResponseEntity.ok(hiringService.teamList(hiringDTO));
    }

    @PostMapping("/teamKick")
    public ResponseEntity<Boolean> teamKick(@RequestBody TeamDTO teamDTO){
        return ResponseEntity.ok(hiringService.kickTeam(teamDTO));
    }
}
