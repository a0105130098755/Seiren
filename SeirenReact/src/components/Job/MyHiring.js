import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchMyHiring } from "../../api/hiringApi";
import HiringCard from "./HiringCard";

const MyHiringContainer = styled.div`
  margin-bottom: 40px;
`;

const MyHiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const MyHiring = ({ onHiringClick }) => {
  const [myHiringList, setMyHiringList] = useState([]);

  useEffect(() => {
    const fetchMyHirings = async () => {
      try {
        const response = await fetchMyHiring();
        setMyHiringList(response);
      } catch (error) {
        console.error("Error fetching my hiring list:", error);
      }
    };

    fetchMyHirings();
  }, []);

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
