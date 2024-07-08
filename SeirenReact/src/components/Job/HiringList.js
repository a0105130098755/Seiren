import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fetchHiringList,
  searchHiringByTitle,
  searchHiringByNickname,
} from "../../api/Api";
import Pagination from "../Board/BoardPagination";
import MyHiring from "./MyHiring";

const HiringPageContainer = styled.div`
  padding: 100px 20px 20px 20px; /* NavBar와 마진 추가 */
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input,
  select,
  button {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
`;

const MyHiringContainer = styled.div`
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

const HiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const HiringCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const CreateButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
`;

function HiringList({ setHiring }) {
  const [hiringList, setHiringList] = useState([]);
  const [myHiringList, setMyHiringList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("title");
  const size = 9;
  const navigate = useNavigate();

  useEffect(() => {
    fetchHirings();
  }, [page]);

  const fetchHirings = async () => {
    try {
      const response = await fetchHiringList(page, size);
      setHiringList(response.hiringDTOS);
      setTotalPages(response.size);
    } catch (error) {
      console.error("Error fetching hiring list:", error);
    }
  };

  const handleSearch = async () => {
    setPage(0);
    try {
      let response;
      if (searchType === "title") {
        response = await searchHiringByTitle(searchKeyword, 0, size);
      } else {
        response = await searchHiringByNickname(searchKeyword, 0, size);
      }
      setHiringList(response.hiringDTOS);
      setTotalPages(response.size);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleHiringClick = (hiring) => {
    setHiring(hiring);
    navigate(`/job/details`);
  };

  return (
    <HiringPageContainer>
      <PageTitle>팀을 모집 해보세요</PageTitle>
      <SearchContainer>
        <SearchBox>
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}
          >
            <option value="title">제목</option>
            <option value="nickname">작성자</option>
          </select>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleSearch}>검색</button>
        </SearchBox>
        <CreateButton to="/job/create">구인 하기</CreateButton>
      </SearchContainer>
      <SubTitle>내가 쓴 글</SubTitle>
      <MyHiringContainer>
        <MyHiring
          setMyHiringList={setMyHiringList}
          handleHiringClick={handleHiringClick}
        />
      </MyHiringContainer>
      <SubTitle>구인 중</SubTitle>
      <HiringGrid>
        {hiringList.map((hiring) => (
          <HiringCard key={hiring.id} onClick={() => handleHiringClick(hiring)}>
            <h3>{hiring.title}</h3>
            <p>{hiring.nickname}</p>
            <p>{hiring.content}</p>
          </HiringCard>
        ))}
      </HiringGrid>
      <Pagination
        activePage={page + 1}
        itemsCountPerPage={size}
        totalItemsCount={totalPages * size}
        pageRangeDisplayed={5}
        onChange={(pageNumber) => {
          setPage(pageNumber - 1);
        }}
      />
    </HiringPageContainer>
  );
}

export default HiringList;
