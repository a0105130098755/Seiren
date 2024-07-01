package com.example.siren.service;

import com.example.siren.dto.BoardDTO;
import com.example.siren.dto.CommentDTO;
import com.example.siren.entity.Board;
import com.example.siren.entity.Comment;
import com.example.siren.entity.Member;
import com.example.siren.repository.BoardRepository;
import com.example.siren.repository.CommentRepository;
import com.example.siren.repository.MemberRepository;
import com.example.siren.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CommentService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @PersistenceContext
    private EntityManager em;

    public List<CommentDTO> viewComment(BoardDTO boardDTO){
        List<Comment> commentList = commentRepository.findByBoardId(boardDTO.getId());
        List<CommentDTO> commentDTOS = new ArrayList<>();
        if(!commentList.isEmpty()){
            for(Comment c : commentList){
                CommentDTO commentDTO = CommentDTO.of(c);
                commentDTOS.add(commentDTO);
            }
            return commentDTOS;
        }else{
            return null;
        }
    }

    public boolean saveComment(CommentDTO commentDTO){
        Optional<Member> memberOptional
                = memberRepository.findById(SecurityUtil.getCurrentMemberId());
        Member member = memberOptional.orElse(null);
        Optional<Board> boardOptional
                = boardRepository.findById(commentDTO.getBoardDTO().getId());
        Comment comment = commentDTO.toEntity(member.getNickname(),boardOptional.get());
        commentRepository.save(comment);
        em.flush();
        em.clear();
        Optional<Comment> commentOptional = commentRepository.findByContent(commentDTO.getContent());

        // save 잘 됐으면 True 반환
        return commentOptional.isPresent();
    }

    public boolean delComment(CommentDTO commentDTO){
        Optional<Member> memberOptional
                = memberRepository.findById(SecurityUtil.getCurrentMemberId());
        Member member = memberOptional.get();
        if(commentDTO.getNickname().equals(member.getNickname())){
            commentRepository.deleteById(commentDTO.getId());
            em.flush();
            em.clear();
            return !commentRepository.existsById(commentDTO.getId());
        }else{
            return false;
        }
    }

}
