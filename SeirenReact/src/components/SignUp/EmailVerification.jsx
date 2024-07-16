import React, { useState, useRef, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { checkExist, sendEmailCode } from "../../api/AuthApi";
import useTimer from "../../hooks/useTimer";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const { timeLeft, isActive, start, stop } = useTimer(180);
  const emailInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSendEmailCode = async () => {
    if (isEmailVerified) {
      setErrors((prev) => ({
        ...prev,
        email: "이미 이메일 인증이 완료되었습니다.",
      }));
      return;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해 주세요." }));
      return;
    }

    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "유효한 이메일 주소를 입력해주세요.",
      }));
      return;
    }

    try {
      const emailExists = await checkExist({ type: "email", value: email });
      if (!emailExists) {
        setErrors((prev) => ({
          ...prev,
          email: "이미 사용 중인 이메일입니다.",
        }));
        return;
      }

      const response = await sendEmailCode(email);
      setGeneratedCode(response.data);
      start();
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

  const handleVerifyEmailCode = () => {
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

    if (isEmailVerified) {
      alert("이미 이메일 인증이 완료되었습니다.");
      return;
    }

    if (emailCode === generatedCode) {
      setIsEmailVerified(true);
      stop();
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
      {isActive && <p className="timer">인증번호 유효 시간: {timeLeft}초</p>}
    </>
  );
};

export default EmailVerification;
