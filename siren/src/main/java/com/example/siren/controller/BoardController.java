package com.example.siren.controller;

import com.example.siren.dto.BoardDTO;
import com.example.siren.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;


@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<List<BoardDTO>> showBoard(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10")int size){
        List<BoardDTO> pageList = boardService.selectPage(page, size);
        return ResponseEntity.ok(pageList);
    }
}
