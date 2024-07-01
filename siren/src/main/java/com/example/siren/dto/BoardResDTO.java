package com.example.siren.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class BoardResDTO {
    List<BoardDTO> boardDTOS;
    int size;

    @Builder
    public BoardResDTO (List<BoardDTO> boardDTOS, int size){
        this.boardDTOS = boardDTOS;
        this.size = size;
    }

}
