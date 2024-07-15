import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("/default-profile.png");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const profileImg = localStorage.getItem("profile");
    if (accessToken) setIsLoggedIn(true);
    if (profileImg) setProfile(profileImg);
  }, [location, isLoggedIn]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiresIn");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profile");
      setIsLoggedIn(false);
      setShowProfileOptions(false);
      setSidebarOpen(false);
      navigate("/");
    } else {
      alert("로그인을 먼저 하셔야 합니다.");
    }
  };

  const toggleProfileOptions = () => {
    if (isLoggedIn) {
      setShowProfileOptions(!showProfileOptions);
    } else {
      navigate("/login");
    }
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
          <Link to="/job">구인 구직</Link>
          <Link to="/charge">충전</Link>
          {isLoggedIn && <Link to="/mypage">마이페이지</Link>}
        </nav>
        <div className="profile" onClick={toggleProfileOptions}>
          {isLoggedIn ? (
            <img src={profile} alt="Profile" className="profile-pic" />
          ) : (
            <Link to="/login">
              <FaUserCircle className="profile-icon" />
            </Link>
          )}
          {isLoggedIn && showProfileOptions && (
            <div className="profile-options">
              <Link to="/mypage" className="mypage-link">
                마이페이지
              </Link>
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
        <div className="sidebar-profile">
          {isLoggedIn ? (
            <img src={profile} alt="Profile" className="profile-pic" />
          ) : (
            <Link to="/login" onClick={toggleSidebar}>
              <FaUserCircle className="profile-icon" />
            </Link>
          )}
        </div>
        <nav className="sidebar-links">
          <Link to="/" onClick={toggleSidebar}>
            메인 페이지
          </Link>
          <Link to="/board" onClick={toggleSidebar}>
            게시글
          </Link>
          <Link to="/job" onClick={toggleSidebar}>
            구인 구직
          </Link>
          <Link to="/charge" onClick={toggleSidebar}>
            충전
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/mypage" onClick={toggleSidebar}>
                마이페이지
              </Link>
              <button
                className="logout-button sidebar-logout"
                onClick={handleLogout}
              >
                로그 아웃
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mobile-login-link"
              onClick={toggleSidebar}
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
