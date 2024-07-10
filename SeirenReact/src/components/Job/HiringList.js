import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fetchHiringList,
  searchHiringByTitle,
  searchHiringByNickname,
} from "../../api/Api";
import Pagination from "../Board/BoardPagination";
import MyHiring from "./MyHiring";
import SentApplications from "./SentApplications";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 20px;
  font-family: "Noto Sans", sans-serif;
`;

const HiringPageContainer = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const ApplicationsContainer = styled.div`
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid #ddd;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CreateButton = styled(Link)`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }
`;

const HiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const HiringCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
  }

  p {
    color: #666;
    font-size: 16px;
    margin: 5px 0;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
  color: #333;
`;

function HiringList({ setHiring }) {
  const [hiringList, setHiringList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    type: "title",
    keyword: "",
  });
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
      if (searchParams.type === "title") {
        response = await searchHiringByTitle(searchParams.keyword, 0, size);
      } else {
        response = await searchHiringByNickname(searchParams.keyword, 0, size);
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
    <PageContainer>
      <HiringPageContainer>
        <PageTitle>구인 구직 페이지</PageTitle>
        <SearchContainer>
          <SearchBox>
            <select
              value={searchParams.type}
              onChange={(e) =>
                setSearchParams({ ...searchParams, type: e.target.value })
              }
            >
              <option value="title">제목</option>
              <option value="nickname">작성자</option>
            </select>
            <SearchInput
              type="text"
              value={searchParams.keyword}
              onChange={(e) =>
                setSearchParams({ ...searchParams, keyword: e.target.value })
              }
              placeholder="검색어를 입력하세요"
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
          </SearchBox>
          <CreateButton to="/job/create">구인 글 작성</CreateButton>
        </SearchContainer>

        <MyHiring onHiringClick={handleHiringClick} />

        <SectionTitle>구인 중</SectionTitle>
        <HiringGrid>
          {hiringList.map((hiring) => (
            <HiringCard
              key={hiring.id}
              onClick={() => handleHiringClick(hiring)}
            >
              <h3>{hiring.title}</h3>
              <p>작성자: {hiring.nickname}</p>
              <p>
                모집 인원: {hiring.current}/{hiring.max}
              </p>
              <p>지역: {hiring.location || "미지정"}</p>
            </HiringCard>
          ))}
        </HiringGrid>
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={size}
          totalItemsCount={totalPages * size}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setPage(pageNumber - 1)}
        />
      </HiringPageContainer>
      <ApplicationsContainer>
        <SentApplications />
      </ApplicationsContainer>
    </PageContainer>
  );
}

export default HiringList;
