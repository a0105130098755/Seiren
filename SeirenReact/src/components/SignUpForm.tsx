import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaAddressCard,
  FaPhone,
  FaImage,
} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Modal from "react-modal";
import { signUp, sendEmailCode, verifyEmailCode } from "../api/Api";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [emailCode, setEmailCode] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSendEmailCode = async () => {
    try {
      await sendEmailCode(email);
      alert("인증번호가 발송되었습니다.");
      localStorage.setItem("sentEmail", email);
    } catch (error) {
      alert("인증번호 발송에 실패했습니다.");
    }
  };

  const handleVerifyEmailCode = async () => {
    try {
      const verified = await verifyEmailCode(email, emailCode);
      if (verified) {
        setIsEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      alert("인증번호 확인에 실패했습니다.");
    }
  };

  const validateForm = (): boolean => {
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !nickname ||
      !address ||
      !phone ||
      !termsAgreed
    ) {
      setError("모든 필드를 입력하고 약관에 동의해야 합니다.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치해야 합니다.");
      return false;
    }
    if (!isEmailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signUp({
          username,
          email,
          password,
          name,
          nickname,
          address,
          phone,
          profileImage: profileImageUrl,
        });
        console.log("회원 가입 성공:", response);
        // Navigate to login page or other action
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="topbar">
        <img src="\Logo.png" alt="Logo" className="logo" />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="form-group">
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleChange(setUsername)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChange(setEmail)}
                className="email-input"
              />
              <MdAlternateEmail className="icon" />
              <button
                type="button"
                className="email-button"
                onClick={handleSendEmailCode}
              >
                인증번호 발송
              </button>
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Email Code"
                value={emailCode}
                onChange={handleChange(setEmailCode)}
              />
              <button
                type="button"
                className="email-confirm-button"
                onClick={handleVerifyEmailCode}
              >
                인증번호 확인
              </button>
            </div>
            <div className="input box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handleChange(setPassword)}
              />
              <FaLock className="icon" />
              <div
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="input box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
              />
              <FaLock className="icon" />
              <div
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChange(setName)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={handleChange(setNickname)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={handleChange(setAddress)}
              />
              <FaAddressCard className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="Phone (000-0000-0000)"
                value={phone}
                onChange={handleChange(setPhone)}
              />
              <FaPhone className="icon" />
            </div>
            <div className="file-input">
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={handleProfileImageChange}
                  className="file-upload-input"
                />
                파일 선택
              </label>
              {profileImage && (
                <div>
                  <button type="button" onClick={openModal}>
                    미리보기
                  </button>
                  <button type="button" onClick={() => setProfileImage(null)}>
                    취소
                  </button>
                </div>
              )}
            </div>
            <label className="terms-label">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              개인정보 처리방침 동의
            </label>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="button">
              Create Account
            </button>
          </div>
          <div className="register">
            <Link to="/login">Already have an account? Log in</Link>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Profile Image Preview</h2>
        {profileImageUrl && <img src={profileImageUrl} alt="Profile Preview" />}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default SignUpForm;
