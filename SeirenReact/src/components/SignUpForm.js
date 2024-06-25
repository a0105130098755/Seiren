import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Modal from "react-modal";
import { signUp, sendEmailCode, checkNickname, checkPhone } from "../api/Api";
import useTimer from "../hooks/useTimer";
import NavBar from "./NavBar";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const SignUpForm = () => {
  // 상태 변수 선언
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const [isPhoneUnique, setIsPhoneUnique] = useState(null);
  const { timeLeft, isActive, start, stop } = useTimer(180);
  const emailInputRef = useRef(null);

  useEffect(() => {
    // 이메일 입력 필드에 포커스 주기
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "emailCode":
        setEmailCode(value);
        break;
      default:
        break;
    }
    console.log(`${name} changed to ${value}`);
  };

  // 프로필 이미지 변경 핸들러
  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setProfileImage(resizedFile);
              setProfileImageUrl(URL.createObjectURL(resizedFile));
              console.log("프로필 이미지 설정됨:", resizedFile);
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        setError("이미지 로드 중 오류 발생");
        console.error("이미지 로드 중 오류 발생");
      };
    }
  };

  // 프로필 이미지 초기화 핸들러
  const handleProfileImageClear = () => {
    setProfileImage(null);
    setProfileImageUrl(null);
    console.log("프로필 이미지 초기화됨");
  };

  // 이메일 인증 코드 발송 핸들러
  const handleSendEmailCode = async () => {
    if (isEmailVerified) {
      setError("이미 이메일 인증이 완료되었습니다.");
      console.warn("이미 이메일 인증이 완료되었습니다.");
      return;
    }

    if (!email) {
      setEmailError("이메일을 입력해 주세요.");
      console.warn("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await sendEmailCode(email);
      console.log("인증 코드 발송 성공:", response.data);
      setGeneratedCode(response.data);
      start();
      alert("인증번호가 발송되었습니다. 이메일을 확인해 주세요.");
    } catch (error) {
      setError(
        error.message || "인증번호 발송에 실패했습니다. 다시 시도해주세요."
      );
      console.error("인증번호 발송 실패:", error.message || "알 수 없는 오류");
    }
  };

  // 이메일 인증 코드 확인 핸들러
  const handleVerifyEmailCode = () => {
    if (!email) {
      setError("이메일을 먼저 입력해 주세요.");
      console.warn("이메일을 먼저 입력해 주세요.");
      return;
    }

    if (!emailCode) {
      setError("인증번호를 입력해 주세요.");
      console.warn("인증번호를 입력해 주세요.");
      return;
    }

    if (isEmailVerified) {
      alert("이미 이메일 인증이 완료되었습니다.");
      console.log("이미 이메일 인증이 완료되었습니다.");
      return;
    }

    if (emailCode === generatedCode) {
      setIsEmailVerified(true);
      stop();
      alert("이메일 인증이 완료되었습니다.");
      console.log("이메일 인증 완료");
    } else {
      setError("인증번호가 일치하지 않습니다.");
      console.warn("인증번호가 일치하지 않습니다.");
    }
  };

  // 닉네임 중복 확인 핸들러
  const checkNicknameUnique = async () => {
    try {
      const isUnique = await checkNickname(nickname);
      setIsNicknameUnique(isUnique);
      console.log("닉네임 중복 확인 결과:", isUnique);
    } catch (error) {
      setError(error.message || "닉네임 중복 확인 중 오류가 발생했습니다.");
      console.error(
        "닉네임 중복 확인 중 오류:",
        error.message || "알 수 없는 오류"
      );
    }
  };

  // 전화번호 중복 확인 핸들러
  const checkPhoneUnique = async () => {
    try {
      const isUnique = await checkPhone(phone);
      setIsPhoneUnique(isUnique);
      console.log("전화번호 중복 확인 결과:", isUnique);
    } catch (error) {
      setError(error.message || "전화번호 중복 확인 중 오류가 발생했습니다.");
      console.error(
        "전화번호 중복 확인 중 오류:",
        error.message || "알 수 없는 오류"
      );
    }
  };

  // 비밀번호 유효성 검증 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // 폼 검증 함수
  const validateForm = () => {
    setError("");
    setEmailError("");

    if (!name) {
      setError("이름을 입력해 주세요.");
      console.warn("이름을 입력해 주세요.");
      return false;
    }
    if (!email) {
      setEmailError("이메일을 입력해 주세요.");
      console.warn("이메일을 입력해 주세요.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      console.warn("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    if (!password) {
      setError("비밀번호를 입력해 주세요.");
      console.warn("비밀번호를 입력해 주세요.");
      return false;
    }
    if (!validatePassword(password)) {
      setError(
        "비밀번호는 최소 8자 이상, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다."
      );
      console.warn(
        "비밀번호는 최소 8자 이상, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다."
      );
      return false;
    }
    if (!confirmPassword) {
      setError("비밀번호 확인을 입력해 주세요.");
      console.warn("비밀번호 확인을 입력해 주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치해야 합니다.");
      console.warn("비밀번호와 비밀번호 확인이 일치해야 합니다.");
      return false;
    }
    if (!nickname) {
      setError("닉네임을 입력해 주세요.");
      console.warn("닉네임을 입력해 주세요.");
      return false;
    }
    if (!phone) {
      setError("전화번호를 입력해 주세요.");
      console.warn("전화번호를 입력해 주세요.");
      return false;
    }
    if (!termsAgreed) {
      setError("약관에 동의해야 합니다.");
      console.warn("약관에 동의해야 합니다.");
      return false;
    }
    if (!isEmailVerified) {
      setError("이메일 인증이 완료되지 않았습니다.");
      console.warn("이메일 인증이 완료되지 않았습니다.");
      return false;
    }
    if (isNicknameUnique === false) {
      setError("이미 사용 중인 닉네임입니다.");
      console.warn("이미 사용 중인 닉네임입니다.");
      return false;
    }
    if (isPhoneUnique === false) {
      setError("이미 사용 중인 전화번호입니다.");
      console.warn("이미 사용 중인 전화번호입니다.");
      return false;
    }

    setError("");
    return true;
  };

  // 회원가입 폼 제출 핸들러
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signUp({
          name,
          email,
          password,
          nickname,
          phone,
          profileImage: profileImageUrl,
        });
        console.log("회원 가입 성공:", response);
        alert("회원가입이 완료되었습니다.");
      } catch (error) {
        setError(
          error.message ||
            "회원 가입 중 오류가 발생했습니다. 다시 시도해주세요."
        );
        console.error(
          "회원 가입 중 오류 발생:",
          error.message || "알 수 없는 오류"
        );
      }
    }
  };

  return (
    <div className="container">
      <NavBar />
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
                id="name"
              />
              <FaUser className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="이메일"
                name="email"
                value={email}
                onChange={handleChange}
                id="email"
                ref={emailInputRef}
                className="email-input"
              />
              <MdAlternateEmail className="icon" />
              <button
                type="button"
                className="email-button"
                onClick={handleSendEmailCode}
                disabled={isActive || isEmailVerified}
              >
                인증번호 발송
              </button>
            </div>
            {emailError && <p className="error">{emailError}</p>}
            <div className="input box full-width">
              <input
                type="text"
                placeholder="인증번호"
                name="emailCode"
                value={emailCode}
                onChange={handleChange}
              />
              <button
                type="button"
                className="email-confirm-button"
                onClick={handleVerifyEmailCode}
              >
                인증번호 확인
              </button>
            </div>
            {isActive && (
              <p className="timer">인증번호 유효 시간: {timeLeft}초</p>
            )}
            <div className="input box full-width">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                name="password"
                value={password}
                onChange={handleChange}
                id="password"
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
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
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
                name="nickname"
                value={nickname}
                onChange={handleChange}
                id="nickname"
              />
              <FaUser className="icon" />
              <button
                type="button"
                className="check-button"
                onClick={checkNicknameUnique}
              >
                중복 확인
              </button>
              {isNicknameUnique === false && (
                <p className="error">이미 사용 중인 닉네임입니다.</p>
              )}
              {isNicknameUnique === true && (
                <p className="success">사용 가능한 닉네임입니다.</p>
              )}
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="전화번호 (000-0000-0000)"
                name="phone"
                value={phone}
                onChange={handleChange}
                id="phone"
              />
              <FaPhone className="icon" />
              <button
                type="button"
                className="check-button"
                onClick={checkPhoneUnique}
              >
                중복 확인
              </button>
              {isPhoneUnique === false && (
                <p className="error">이미 사용 중인 전화번호입니다.</p>
              )}
              {isPhoneUnique === true && (
                <p className="success">사용 가능한 전화번호입니다.</p>
              )}
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
                  onClick={() => setModalIsOpen(true)}
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
                onClick={() => setPrivacyModalIsOpen(true)}
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
        onRequestClose={() => setModalIsOpen(false)}
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
        <button onClick={() => setModalIsOpen(false)} className="modal-button">
          닫기
        </button>
      </Modal>
      <Modal
        isOpen={privacyModalIsOpen}
        onRequestClose={() => setPrivacyModalIsOpen(false)}
        contentLabel="Terms and Conditions"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>개인정보 처리방침</h2>
        <div className="modal-content">
          {/* 개인정보 처리방침 내용 */}
          <p>{/* 주석 처리된 개인정보 처리방침 내용 */}</p>
        </div>
        <button
          onClick={() => setPrivacyModalIsOpen(false)}
          className="modal-button"
        >
          닫기
        </button>
      </Modal>
    </div>
  );
};

export default SignUpForm;
