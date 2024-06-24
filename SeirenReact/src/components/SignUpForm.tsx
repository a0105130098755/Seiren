import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaAddressCard,
  FaPhone,
} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Modal from "react-modal";
import { signUp, sendEmailCode } from "../api/Api";
import useTimer from "../hooks/useTimer";
import NavBar from "./NavBar";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const SignUpForm: React.FC = () => {
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
  const [generatedCode, setGeneratedCode] = useState<string>(""); // 이메일 인증 코드
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false); // 상태 추가
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { timeLeft, isActive, start, stop } = useTimer(180);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx?.drawImage(img, 0, 0, 100, 100);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setProfileImage(resizedFile);
              setProfileImageUrl(URL.createObjectURL(resizedFile));
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };

  const handleProfileImageClear = () => {
    setProfileImage(null);
    setProfileImageUrl(null);
  };

  const handleSendEmailCode = async () => {
    try {
      const response = await sendEmailCode(email);
      setGeneratedCode(response.code);
      start();
    } catch (error) {
      setError("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = (): boolean => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
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
    if (!validatePassword(password)) {
      setError(
        "비밀번호는 최소 8자 이상, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치해야 합니다.");
      return false;
    }
    if (emailCode !== generatedCode) {
      setError("인증번호가 일치하지 않습니다.");
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
          name,
          email,
          password,
          nickname,
          address,
          phone,
          profileImage: profileImageUrl,
        });
        console.log("회원 가입 성공:", response);
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

  const openPrivacyModal = () => {
    setPrivacyModalIsOpen(true);
  };

  const closePrivacyModal = () => {
    setPrivacyModalIsOpen(false);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>회원 가입</h1>
          <div className="form-group">
            <div className="input box full-width">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={handleChange(setName)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={handleChange(setEmail)}
                className="email-input"
              />
              <MdAlternateEmail className="icon" />
              <button
                type="button"
                className="email-button"
                onClick={handleSendEmailCode}
                disabled={isActive}
              >
                인증번호 발송
              </button>
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="인증번호"
                value={emailCode}
                onChange={handleChange(setEmailCode)}
              />
              <button
                type="button"
                className="email-confirm-button"
                onClick={() => {
                  if (emailCode === generatedCode) {
                    setIsEmailVerified(true);
                    stop();
                    alert("이메일 인증이 완료되었습니다.");
                  } else {
                    alert("인증번호가 일치하지 않습니다.");
                  }
                }}
              >
                인증번호 확인
              </button>
            </div>
            <div className="input box full-width">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={handleChange(setPassword)}
              />
              <FaLock className="icon" />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input box full-width">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
              />
              <FaLock className="icon" />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="별명"
                value={nickname}
                onChange={handleChange(setNickname)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="주소"
                value={address}
                onChange={handleChange(setAddress)}
              />
              <FaAddressCard className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="전화번호 (000-0000-0000)"
                value={phone}
                onChange={handleChange(setPhone)}
              />
              <FaPhone className="icon" />
            </div>
            <label className="file-upload-label">
              <input
                type="file"
                onChange={handleProfileImageChange}
                className="file-upload-input"
              />
              파일 선택
            </label>
            {profileImage && (
              <div className="button-group">
                <button
                  type="button"
                  className="preview-button"
                  onClick={openModal}
                >
                  미리보기
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleProfileImageClear}
                >
                  취소
                </button>
              </div>
            )}
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
                onClick={openPrivacyModal}
                className="modal-button"
              >
                개인정보 처리방침
              </button>
            </div>
            {error && <p className="error">{error}</p>}
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
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>이미지 미리보기</h2>
        {profileImage && (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="프로필 미리보기"
            className="image-preview"
          />
        )}
        <button onClick={closeModal} className="modal-button">
          닫기
        </button>
      </Modal>
      <Modal
        isOpen={privacyModalIsOpen}
        onRequestClose={closePrivacyModal}
        contentLabel="Terms and Conditions"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>개인정보 처리방침</h2>
        <div className="modal-content">
          {/* 개인정보 처리방침 내용 */}
          <p>{/* 주석 처리된 개인정보 처리방침 내용 */}</p>
        </div>
        <button onClick={closePrivacyModal} className="modal-button">
          닫기
        </button>
      </Modal>
    </div>
  );
};

export default SignUpForm;
