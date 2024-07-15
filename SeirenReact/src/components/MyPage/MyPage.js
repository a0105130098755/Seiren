import React, { useState, useEffect } from "react";
import {
  PageContainer,
  TabContainer,
  Tab,
  ContentSection,
  SectionTitle,
} from "./MyPageStyles";
import UserInfoSection from "./UserInfoSection";
import MyBoardsSection from "./MyBoardsSection";
import MyHiringsSection from "./MyHiringsSection";
import MyApplicationsSection from "./MyApplicationsSection";
import CryptoJS from "crypto-js";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    const encryptedNickname = localStorage.getItem("nickname");
    if (encryptedNickname) {
      const bytes = CryptoJS.AES.decrypt(
        encryptedNickname,
        process.env.REACT_APP_SECRET_KEY
      );
      const nickname = bytes.toString(CryptoJS.enc.Utf8);
      setUserInfo({
        nickname: nickname,
        email: localStorage.getItem("email"),
        profile: localStorage.getItem("profile"),
        point: localStorage.getItem("point"),
      });
    }
    setLoading(false);
  };

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
    <PageContainer>
      <TabContainer>
        <Tab active={activeTab === "info"} onClick={() => setActiveTab("info")}>
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
  );
};

export default MyPage;
