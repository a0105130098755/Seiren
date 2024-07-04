package com.example.siren.repository;

import com.example.siren.entity.Send;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SendRepository extends JpaRepository<Send,Long> {

}
