import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchMyHiring } from "../../api/hiringApi";
import HiringCard from "./HiringCard";

// 스타일 컴포넌트 정의
const MyHiringContainer = styled.div`
  margin-bottom: 40px;
`;

const MyHiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

// MyHiring 컴포넌트: 사용자가 작성한 구인 글 목록을 표시
const MyHiring = ({ onHiringClick }) => {
  // 내가 작성한 구인 글 목록 상태
  const [myHiringList, setMyHiringList] = useState([]);

  useEffect(() => {
    // 내가 작성한 구인 글 목록을 가져오는 함수
    const fetchMyHirings = async () => {
      try {
        const response = await fetchMyHiring();
        setMyHiringList(response);
      } catch (error) {
        console.error("Error fetching my hiring list:", error);
        // TODO: 사용자에게 오류 메시지 표시
      }
    };

    fetchMyHirings();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <MyHiringContainer>
      <h2>내가 쓴 글</h2>
      {myHiringList.length === 0 ? (
        <p>아직 작성한 글이 없습니다.</p>
      ) : (
        <MyHiringGrid>
          {myHiringList.map((hiring) => (
            <HiringCard
              key={hiring.id}
              hiring={hiring}
              onClick={onHiringClick}
            />
          ))}
        </MyHiringGrid>
      )}
    </MyHiringContainer>
  );
};

export default MyHiring;
