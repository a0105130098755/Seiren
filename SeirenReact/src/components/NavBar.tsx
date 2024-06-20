import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isProfileSet = false; // 예시: 실제로는 프로필이 설정되었는지 확인하는 로직을 넣어야 합니다.

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/Logo.png" alt="Logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/">메인 페이지</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/jobs">구인 구직</Link>
          <Link to="/charge">충전</Link>
        </nav>
        <div className="profile">
          {isProfileSet ? (
            <img
              src="/default-profile.png"
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}
        </div>
        <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <FaTimes className="close-icon" onClick={toggleSidebar} />
        <div className="profile">
          {isProfileSet ? (
            <img
              src="/default-profile.png"
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}
        </div>
        <nav className="sidebar-links">
          <Link to="/posts" onClick={toggleSidebar}>
            게시글
          </Link>
          <Link to="/jobs" onClick={toggleSidebar}>
            구인 구직
          </Link>
          <Link to="/charge" onClick={toggleSidebar}>
            충전
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
