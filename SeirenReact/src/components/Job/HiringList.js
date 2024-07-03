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
  padding: 20px;
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

const HiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
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
  const [myHiringList, setMyHiringList] = useState([]);
  const [hiringList, setHiringList] = useState([]);
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
        <div>
          <select
            value={searchType}
            onChange={(e) => {
              console.log("Search type changed to:", e.target.value);
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
              console.log("Search keyword changed to:", e.target.value);
              setSearchKeyword(e.target.value);
            }}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <CreateButton to="/job/create">구인 하기</CreateButton>
      </SearchContainer>
      <SubTitle>내가 쓴 글</SubTitle>
      <MyHiring setMyHiringList={setMyHiringList} />{" "}
      {/* setMyHiringList 전달 */}
      <HiringGrid>
        {myHiringList.map((hiring) => (
          <HiringCard key={hiring.id} onClick={() => handleHiringClick(hiring)}>
            <ProfileImage
              src={hiring.profile || "default-profile.jpg"}
              alt="Profile"
            />
            <h3>{hiring.title}</h3>
            <p>Position: {hiring.position}</p>
            <p>{hiring.content}</p>
          </HiringCard>
        ))}
      </HiringGrid>
      <SubTitle>구인 중</SubTitle>
      <HiringGrid>
        {hiringList.map((hiring) => (
          <HiringCard key={hiring.id} onClick={() => handleHiringClick(hiring)}>
            <ProfileImage
              src={hiring.profile || "default-profile.jpg"}
              alt="Profile"
            />
            <h3>{hiring.title}</h3>
            <p>Position: {hiring.position}</p>
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
          console.log("Page changed to:", pageNumber);
          setPage(pageNumber - 1);
        }}
      />
    </HiringPageContainer>
  );
}

export default HiringList;
