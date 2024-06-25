package com.example.siren.service;

import com.example.siren.dto.BoardDTO;
import com.example.siren.entity.Board;
import com.example.siren.repository.BoardRepository;
import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BoardService {
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public List<BoardDTO> selectPage(int page, int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<Board> boards = boardRepository.findAll(pageable);
        List<BoardDTO> boardDTOS = new ArrayList<>();
        for(Board b : boards){
            BoardDTO boardDTO = BoardDTO.of(b);
            boardDTOS.add(boardDTO);
        }
        return boardDTOS;
    }
}
