import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { signUp } from "../../api/AuthApi";
import NavBar from "../Navbar/NavBar";
import EmailVerification from "./EmailVerification";
import PasswordInput from "./PasswordInput";
import NicknamePhoneVerification from "./NicknamePhoneVerification";
import ImageUploader from "./ImageUploader";
import PrivacyPolicy from "./PrivacyPolicy";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

Modal.setAppElement("#root");

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
  const [uploadTrigger, setUploadTrigger] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        setName(value);
        if (!value) newErrors.name = "이름을 입력해 주세요.";
        else delete newErrors.name;
        break;
      case "nickname":
        setNickname(value);
        if (!value) newErrors.nickname = "닉네임을 입력해 주세요.";
        else delete newErrors.nickname;
        break;
      case "phone":
        setPhone(value);
        if (!/^[0-9-]+$/.test(value))
          newErrors.phone = "전화번호는 숫자와 하이픈만 입력 가능합니다.";
        else delete newErrors.phone;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name) newErrors.name = "이름을 입력해 주세요.";
    if (!nickname) newErrors.nickname = "닉네임을 입력해 주세요.";
    if (!phone) newErrors.phone = "전화번호를 입력해 주세요.";
    if (!termsAgreed) newErrors.termsAgreed = "약관에 동의해야 합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUploadTrigger(true);
      try {
        const response = await signUp({
          name,
          email,
          password,
          nickname,
          phone,
          profile: profileImageUrl || "기본 이미지 URL",
        });
        console.log("회원 가입 성공:", response);
        alert("회원가입이 완료되었습니다.");
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          submit:
            error.message ||
            "회원 가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        }));
        console.error(
          "회원 가입 중 오류 발생:",
          error.message || "알 수 없는 오류"
        );
      }
    }
  };

  return (
    <div className="fullscreen-container">
      <NavBar />
      <div className="container">
        <div className="form-container">
          <form className="form" onSubmit={handleSignUpSubmit}>
            <h1>회원 가입</h1>
            <div className="form-group">
              <div className="input box full-width">
                <input
                  type="text"
                  placeholder="이름"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <FaUser className="icon" />
              </div>
              {errors.name && <p className="error">{errors.name}</p>}

              <EmailVerification />

              <PasswordInput name="password" />
              <PasswordInput name="confirmPassword" />

              <NicknamePhoneVerification
                nickname={nickname}
                phone={phone}
                onChange={handleChange}
                errors={errors}
              />

              <ImageUploader
                usernickname={nickname}
                uploadTrigger={uploadTrigger}
                setProfileImageUrl={setProfileImageUrl}
              />

              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                  />
                  개인정보 처리방침 동의
                </label>
                <button
                  type="button"
                  onClick={() => setPrivacyModalIsOpen(true)}
                  className="modal-button"
                >
                  개인정보 처리방침
                </button>
              </div>
              {errors.termsAgreed && (
                <p className="error">{errors.termsAgreed}</p>
              )}
              {errors.submit && <p className="error">{errors.submit}</p>}

              <button type="submit" className="button">
                계정 생성
              </button>
              <p className="register">
                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
              </p>
            </div>
          </form>
        </div>

        <Modal
          isOpen={privacyModalIsOpen}
          onRequestClose={() => setPrivacyModalIsOpen(false)}
          contentLabel="Terms and Conditions"
          className="modal"
          overlayClassName="overlay"
        >
          <PrivacyPolicy />
          <button
            onClick={() => setPrivacyModalIsOpen(false)}
            className="modal-button"
          >
            닫기
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default SignUpForm;
