import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchMyHiring, deleteHiring } from "../../api/Api";

const MyHiringGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MyHiringCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1 1 calc(25% - 40px); /* 4개씩 표시되도록 */
  min-width: 200px;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

function MyHiring({ setMyHiringList, handleHiringClick }) {
  const [myHiringList, setMyHiringListState] = useState([]);

  useEffect(() => {
    fetchMyHiringList();
  }, []);

  const fetchMyHiringList = async () => {
    try {
      const response = await fetchMyHiring();
      setMyHiringListState(response);
      setMyHiringList(response);
    } catch (error) {
      console.error("내 구인구직 글 목록을 가져오는데 실패했습니다.", error);
    }
  };

  const handleDelete = async (hiring) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await deleteHiring({
          id: hiring.id,
          nickname: hiring.nickname,
        });
        if (response) {
          alert("구인 정보가 삭제되었습니다.");
          fetchMyHiringList();
        } else {
          alert("니가 쓴 글만 지워라.");
        }
      } catch (error) {
        console.error("구인 정보를 삭제하는데 실패했습니다.", error);
      }
    }
  };

  return (
    <MyHiringGrid>
      {myHiringList.map((hiring) => (
        <MyHiringCard key={hiring.id} onClick={() => handleHiringClick(hiring)}>
          <h3>{hiring.title}</h3>
          <p>{hiring.content}</p>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(hiring);
            }}
          >
            내 글 삭제
          </DeleteButton>
        </MyHiringCard>
      ))}
    </MyHiringGrid>
  );
}

export default MyHiring;
