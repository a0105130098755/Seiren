package com.example.siren.controller;

import com.example.siren.dto.BoardDTO;
import com.example.siren.dto.CommentDTO;
import com.example.siren.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/show")
    public ResponseEntity<List<CommentDTO>> showComment(@RequestBody BoardDTO boardDTO){
        return ResponseEntity.ok(commentService.viewComment(boardDTO));
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> saveComment(@RequestBody CommentDTO commentDTO){
        return ResponseEntity.ok(commentService.saveComment(commentDTO));
    }

    @PostMapping("/del")
    public ResponseEntity<Boolean> delComment(@RequestBody CommentDTO commentDTO){
        return ResponseEntity.ok(commentService.delComment(commentDTO));
    }
}
