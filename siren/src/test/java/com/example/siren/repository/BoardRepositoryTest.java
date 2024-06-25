package com.example.siren.repository;

import com.example.siren.entity.Board;
import com.example.siren.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.TestPropertySource;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;


@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@Slf4j
@Transactional
class BoardRepositoryTest {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    MemberRepository memberRepository;

    @PersistenceContext
    EntityManager em;

    public Member createMember(){
        return Member.builder()
                .email("test@naver.com")
                .name("박상원")
                .profile("image")
                .build();
    }
    
    @Test
    @DisplayName("게시글 조회 테스트")
    public void findAllTest(){
        Member member = this.createMember();
        memberRepository.save(member);
        for(int i= 0; i < 10; i ++ ){
            Board board = Board.builder()
                    .member(member)
                    .title(i+"번 게시물")
                    .content(i + "번 내용")
                    .build();
            boardRepository.save(board);
        }
        em.flush();
        em.clear();
        // size 만큼 page 를 나눈 뒤 page 번 page 보여줌
        // 페이지는 0번부터, n개씩.
        Pageable pageable = PageRequest.of(0,2);
        Page<Board> boardList = boardRepository.findAll(pageable);
        for (Board b : boardList){
            log.warn(b.getTitle());
            log.warn("작성자 : " + b.getMember().getNickname());
            log.warn(b.getContent());
        }
    }
}