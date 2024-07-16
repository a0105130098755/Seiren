import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import // ... (스타일 컴포넌트 import)
"./HirListstyled";
import {
  fetchHiringList,
  searchHiringByTitle,
  searchHiringByNickname,
} from "../../api/hiringApi";
import Pagination from "../Board/BoardPagination";
import MyHiring from "./MyHiring";
import SentApplications from "./SentApplications";
import BackButton from "../BackButton";

// HiringList 컴포넌트: 구인구직 목록을 표시하고 관리합니다.
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

  // 페이지 변경 시 구인 목록을 다시 가져옵니다.
  useEffect(() => {
    fetchHirings();
  }, [page]);

  // 구인 목록을 서버에서 가져오는 함수
  const fetchHirings = async () => {
    try {
      const response = await fetchHiringList(page, size);
      setHiringList(response.hiringDTOS);
      setTotalPages(response.size);
    } catch (error) {
      console.error("Error fetching hiring list:", error);
      // TODO: 사용자에게 에러 메시지 표시
    }
  };

  // 검색 기능 구현
  const handleSearch = async () => {
    setPage(0);
    try {
      const searchFunction =
        searchParams.type === "title"
          ? searchHiringByTitle
          : searchHiringByNickname;
      const response = await searchFunction(searchParams.keyword, 0, size);
      setHiringList(response.hiringDTOS);
      setTotalPages(response.size);
    } catch (error) {
      console.error("Error during search:", error);
      // TODO: 사용자에게 검색 실패 메시지 표시
    }
  };

  // 구인 글 클릭 시 상세 페이지로 이동
  const handleHiringClick = (hiring) => {
    setHiring(hiring);
    navigate(`/job/details`);
  };

  return (
    <PageContainer>
      <HiringPageContainer>
        <BackButton />
        <PageTitle>구인 구직 페이지</PageTitle>
        {/* 검색 기능 */}
        <SearchContainer>{/* ... (검색 관련 컴포넌트) */}</SearchContainer>

        {/* 사용자의 구인 글 목록 */}
        <MyHiring onHiringClick={handleHiringClick} />

        {/* 전체 구인 글 목록 */}
        <SectionTitle>구인 중</SectionTitle>
        <HiringGrid>
          {hiringList.map((hiring) => (
            <HiringCard
              key={hiring.id}
              onClick={() => handleHiringClick(hiring)}
            >
              {/* ... (구인 글 정보 표시) */}
            </HiringCard>
          ))}
        </HiringGrid>
        {/* 페이지네이션 */}
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={size}
          totalItemsCount={totalPages * size}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setPage(pageNumber - 1)}
        />
      </HiringPageContainer>
      {/* 사용자가 지원한 구인 글 목록 */}
      <ApplicationsContainer>
        <SentApplications />
      </ApplicationsContainer>
    </PageContainer>
  );
}

export default HiringList;
