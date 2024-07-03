package com.example.siren.service;

import com.example.siren.dto.BoardDTO;
import com.example.siren.dto.BoardResDTO;
import com.example.siren.entity.Board;
import com.example.siren.entity.Member;
import com.example.siren.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final AuthGetInfo authGetInfo;

    public BoardResDTO selectPage(int page, int size, String title){
        Pageable pageable = PageRequest.of(page,size);
        Page<Board> boards;
        if(title.equals("all") ){
            boards = boardRepository.findAll(pageable);
        }else {
            boards = boardRepository.findByTitleContaining(title,pageable);
        }
        log.info(" 전체 페이지 : {}" ,boards.getTotalPages());
        List<BoardDTO> boardDTOS = new ArrayList<>();
        for(Board b : boards){
            BoardDTO boardDTO = BoardDTO.of(b);
            boardDTOS.add(boardDTO);
        }
        return BoardResDTO.builder()
                .boardDTOS(boardDTOS)
                .size(boards.getTotalPages())
                .build();
    }

    public boolean saveBoard(BoardDTO boardDTO){
        Member member = authGetInfo.getMember();
        if(member != null){
            try {
                Board board = boardDTO.toEntity(member);
                boardRepository.save(board);
                log.info("게시글 저장 user 정보 : " + member.toString());
                log.info("게시글 저장 게시글 정보 : " + board);
                return true;
            }catch (Exception e){
                log.warn("게시글 저장 중 오류 발생 :" + e);
                return false;
            }
        }
        log.warn("게시글 저장 실패" );
        return false;
    }
    
    public boolean deleteBoard(BoardDTO boardDTO){
        Member member = authGetInfo.getMember();
        log.warn("member 의 이름 : {}",member.getNickname());
        if(member.getNickname().equals(boardDTO.getNickname())) {
            boardRepository.deleteById(boardDTO.getId());
            return !boardRepository.existsById(boardDTO.getId());
        }
        // true 면 삭제 잘 된것
        return false;
    }
}
