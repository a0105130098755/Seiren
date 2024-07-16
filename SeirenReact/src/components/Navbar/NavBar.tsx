import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

// NavBar 컴포넌트: 웹사이트의 네비게이션 바를 구현
const NavBar = () => {
  // 사이드바 열림/닫힘 상태
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 프로필 옵션 표시 상태
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  // 현재 라우트 위치
  const location = useLocation();
  const navigate = useNavigate();
  // 프로필 이미지 상태
  const [profile, setProfile] = useState("/default-profile.png");

  // 컴포넌트 마운트 및 라우트 변경시 로그인 상태와 프로필 이미지 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const profileImg = localStorage.getItem("profile");
    if (accessToken) setIsLoggedIn(true);
    if (profileImg) setProfile(profileImg);
  }, [location, isLoggedIn]);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    if (isLoggedIn) {
      // 로컬 스토리지에서 사용자 정보 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiresIn");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profile");
      // 상태 초기화
      setIsLoggedIn(false);
      setShowProfileOptions(false);
      setSidebarOpen(false);
      navigate("/");
    } else {
      alert("로그인을 먼저 하셔야 합니다.");
    }
  };

  // 프로필 옵션 토글 함수
  const toggleProfileOptions = () => {
    if (isLoggedIn) {
      setShowProfileOptions(!showProfileOptions);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* 메인 네비게이션 바 */}
      <div className="navbar">
        {/* 로고 */}
        <div className="logo">
          <Link to="/">
            <img src="/Logo.png" alt="Logo" />
          </Link>
        </div>
        {/* 네비게이션 링크 */}
        <nav className="nav-links">{/* ... 네비게이션 링크들 ... */}</nav>
        {/* 프로필 섹션 */}
        <div className="profile" onClick={toggleProfileOptions}>
          {/* 프로필 이미지 또는 로그인 아이콘 */}
          {isLoggedIn ? (
            <img src={profile} alt="Profile" className="profile-pic" />
          ) : (
            <Link to="/login">
              <FaUserCircle className="profile-icon" />
            </Link>
          )}
          {/* 프로필 옵션 드롭다운 */}
          {isLoggedIn && showProfileOptions && (
            <div className="profile-options">
              {/* ... 프로필 옵션 버튼들 ... */}
            </div>
          )}
        </div>
        {/* 햄버거 메뉴 아이콘 */}
        <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      </div>

      {/* 사이드바 (모바일 뷰) */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* 사이드바 닫기 아이콘 */}
        <FaTimes className="close-icon" onClick={toggleSidebar} />
        {/* 사이드바 프로필 섹션 */}
        <div className="sidebar-profile">
          {/* ... 프로필 이미지 또는 로그인 아이콘 ... */}
        </div>
        {/* 사이드바 네비게이션 링크 */}
        <nav className="sidebar-links">
          {/* ... 사이드바 네비게이션 링크들 ... */}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
