import React, { useState, useRef, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { checkExist, sendEmailCode } from "../../api/AuthApi";
import useTimer from "../../hooks/useTimer";

// EmailVerification 컴포넌트: 이메일 인증 프로세스를 관리
const EmailVerification = () => {
  // 상태 관리
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  // 커스텀 타이머 훅 사용
  const { timeLeft, isActive, start, stop } = useTimer(180); // 3분 타이머

  // 이메일 입력 필드 ref
  const emailInputRef = useRef(null);

  // 컴포넌트 마운트 시 이메일 입력 필드에 포커스
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // 이메일 유효성 검사 함수
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // 인증번호 발송 핸들러
  const handleSendEmailCode = async () => {
    // 이미 인증된 경우 처리
    if (isEmailVerified) {
      setErrors((prev) => ({
        ...prev,
        email: "이미 이메일 인증이 완료되었습니다.",
      }));
      return;
    }

    // 이메일 입력 확인
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해 주세요." }));
      return;
    }

    // 이메일 형식 확인
    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "유효한 이메일 주소를 입력해주세요.",
      }));
      return;
    }

    try {
      // 이메일 중복 확인
      const emailExists = await checkExist({ type: "email", value: email });
      if (!emailExists) {
        setErrors((prev) => ({
          ...prev,
          email: "이미 사용 중인 이메일입니다.",
        }));
        return;
      }

      // 인증번호 발송 API 호출
      const response = await sendEmailCode(email);
      setGeneratedCode(response.data);
      start(); // 타이머 시작
      setIsEmailInputDisabled(true);
      alert("인증번호가 발송되었습니다. 이메일을 확인해 주세요.");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email:
          error.message || "인증번호 발송에 실패했습니다. 다시 시도해주세요.",
      }));
    }
  };

  // 인증번호 확인 핸들러
  const handleVerifyEmailCode = () => {
    // 입력 검증
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 먼저 입력해 주세요." }));
      return;
    }

    if (!emailCode) {
      setErrors((prev) => ({
        ...prev,
        emailCode: "인증번호를 입력해 주세요.",
      }));
      return;
    }

    // 이미 인증된 경우 처리
    if (isEmailVerified) {
      alert("이미 이메일 인증이 완료되었습니다.");
      return;
    }

    // 인증번호 확인
    if (emailCode === generatedCode) {
      setIsEmailVerified(true);
      stop(); // 타이머 정지
      alert("이메일 인증이 완료되었습니다.");
      setErrors((prev) => ({
        ...prev,
        emailCode: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        emailCode: "인증번호가 일치하지 않습니다.",
      }));
    }
  };

  return (
    <>
      {/* 이메일 입력 필드 */}
      <div className="input box full-width">
        <div className="email-input-container">
          <input
            type="text"
            placeholder="이메일"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
            className="email-input"
            disabled={isEmailInputDisabled}
          />
        </div>
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
      {errors.email && <p className="error">{errors.email}</p>}

      {/* 인증번호 입력 필드 */}
      <div className="input box full-width">
        <input
          type="text"
          placeholder="인증번호"
          name="emailCode"
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
        />
        <button
          type="button"
          className="email-confirm-button"
          onClick={handleVerifyEmailCode}
        >
          인증번호 확인
        </button>
      </div>
      {errors.emailCode && <p className="error">{errors.emailCode}</p>}

      {/* 타이머 표시 */}
      {isActive && <p className="timer">인증번호 유효 시간: {timeLeft}초</p>}
    </>
  );
};

export default EmailVerification;
