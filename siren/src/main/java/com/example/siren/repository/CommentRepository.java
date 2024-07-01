package com.example.siren.repository;

import com.example.siren.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
        List<Comment> findByBoardId(Long id);
        Optional<Comment> findByContent(String content);
        Optional<Comment> findById(Long id);
        void deleteById(Long id);
        boolean existsById(Long id);
}
