import React, { useState } from "react";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import EmailLookupForm from "./EmailLookupForm";
import NavBar from "../Navbar/NavBar";
import "./PasswordRecoveryEmailLookup.css";

const PasswordRecoveryEmailLookup = () => {
  const [activeTab, setActiveTab] = useState("find-email");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="tab-header">
          <button
            className={`tab-button ${
              activeTab === "find-email" ? "active" : ""
            }`}
            onClick={() => handleTabClick("find-email")}
          >
            아이디 찾기
          </button>
          <button
            className={`tab-button ${
              activeTab === "forgot-password" ? "active" : ""
            }`}
            onClick={() => handleTabClick("forgot-password")}
          >
            비밀번호 찾기
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "find-email" && <EmailLookupForm />}
          {activeTab === "forgot-password" && <PasswordRecoveryForm />}
        </div>
      </div>
    </>
  );
};

export default PasswordRecoveryEmailLookup;
