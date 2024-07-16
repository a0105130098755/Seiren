import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import {
  PageContainer,
  TabContainer,
  Tab,
  ContentSection,
  SectionTitle,
  PageTitle,
} from "./MyPageStyles";
import UserInfoSection from "./UserInfoSection";
import MyBoardsSection from "./MyBoardsSection";
import MyHiringsSection from "./MyHiringsSection";
import MyApplicationsSection from "./MyApplicationsSection";

// MyPage 컴포넌트: 사용자의 마이페이지를 구성하는 메인 컴포넌트
const MyPage = () => {
  // 현재 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState("info");
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState(null);
  // 로딩 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserInfo();
  }, []);

  // 로컬 스토리지에서 사용자 정보를 불러오는 함수
  const loadUserInfo = () => {
    const encryptedNickname = localStorage.getItem("nickname");
    if (encryptedNickname) {
      // 암호화된 닉네임 복호화
      const bytes = CryptoJS.AES.decrypt(
        encryptedNickname,
        process.env.REACT_APP_SECRET_KEY
      );
      const nickname = bytes.toString(CryptoJS.enc.Utf8);
      setUserInfo({
        nickname: nickname,
        email: localStorage.getItem("email"),
        profile: localStorage.getItem("profile"),
      });
    }
    setLoading(false);
  };

  // 현재 탭에 따라 적절한 컨텐츠를 렌더링하는 함수
  const renderContent = () => {
    if (loading) return <div>로딩 중...</div>;

    switch (activeTab) {
      case "info":
        return userInfo ? (
          <UserInfoSection userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : (
          <div>사용자 정보를 불러올 수 없습니다.</div>
        );
      case "posts":
        return <MyBoardsSection />;
      case "hirings":
        return <MyHiringsSection />;
      case "applications":
        return <MyApplicationsSection />;
      default:
        return null;
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <PageContainer>
        <PageTitle>마이페이지</PageTitle>
        {/* 탭 네비게이션 */}
        <TabContainer>
          <Tab
            active={activeTab === "info"}
            onClick={() => setActiveTab("info")}
          >
            내 정보
          </Tab>
          <Tab
            active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          >
            내 게시글
          </Tab>
          <Tab
            active={activeTab === "hirings"}
            onClick={() => setActiveTab("hirings")}
          >
            내 구인글
          </Tab>
          <Tab
            active={activeTab === "applications"}
            onClick={() => setActiveTab("applications")}
          >
            지원 현황
          </Tab>
        </TabContainer>

        {/* 컨텐츠 섹션 */}
        <ContentSection>
          <SectionTitle>
            {activeTab === "info" && "내 정보"}
            {activeTab === "posts" && "내 게시글"}
            {activeTab === "hirings" && "내 구인글"}
            {activeTab === "applications" && "지원 현황"}
          </SectionTitle>
          {renderContent()}
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default MyPage;
