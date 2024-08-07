import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  MyHiringContainer,
  MyHiringGrid,
  HiringPageContainer,
  ApplicationsContainer,
  PageTitle,
  SearchContainer,
  SearchBox,
  SearchSelect,
  SearchInput,
  SearchButton,
  CreateButton,
  HiringGrid,
  HiringCard,
  SectionTitle,
} from "./HirListstyled";
import {
  fetchHiringList,
  searchHiringByTitle,
  searchHiringByNickname,
} from "../../api/Api";
import Pagination from "../Board/BoardPagination";
import MyHiring from "./MyHiring";
import SentApplications from "./SentApplications";
import BackButton from "../BackButton";

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
        <BackButton />
        <PageTitle>구인 구직 페이지</PageTitle>
        <SearchContainer>
          <SearchBox>
            <SearchSelect
              value={searchParams.type}
              onChange={(e) =>
                setSearchParams({ ...searchParams, type: e.target.value })
              }
            >
              <option value="title">제목</option>
              <option value="nickname">작성자</option>
            </SearchSelect>
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
