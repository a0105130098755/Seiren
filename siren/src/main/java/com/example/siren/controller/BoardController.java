package com.example.siren.controller;

import com.example.siren.dto.BoardDTO;
import com.example.siren.dto.BoardResDTO;
import com.example.siren.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/list")
    public ResponseEntity<BoardResDTO> showBoard(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10")int size){
        BoardResDTO pageList = boardService.selectPage(page, size);
        return ResponseEntity.ok(pageList);
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> saveBoard(@RequestBody BoardDTO boardDTO){
        boolean isSave = boardService.saveBoard(boardDTO);
        return ResponseEntity.ok(isSave);
    }
}
