import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      setShowProfileOptions(false);
      setSidebarOpen(false);
    } else {
      alert("로그인을 먼저 하셔야 합니다.");
    }
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
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
          <Link to="/board">게시글</Link>
          <Link to="/jobs">구인 구직</Link>
          <Link to="/charge">충전</Link>
        </nav>
        <div className="profile" onClick={toggleProfileOptions}>
          {isLoggedIn ? (
            <img
              src="/default-profile.png"
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}
          {showProfileOptions && (
            <div className="profile-options">
              <button className="logout-button" onClick={handleLogout}>
                로그 아웃
              </button>
            </div>
          )}
        </div>
        <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <FaTimes className="close-icon" onClick={toggleSidebar} />
        <div className="profile">
          {isLoggedIn ? (
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
          <button
            className="logout-button sidebar-logout"
            onClick={handleLogout}
          >
            로그 아웃
          </button>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
