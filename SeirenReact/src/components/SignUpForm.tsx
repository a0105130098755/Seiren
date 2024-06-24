import React, { useReducer, ChangeEvent, FormEvent } from "react";
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
import { signUp, sendEmailCode, checkNickname, checkPhone } from "../api/Api";
import useTimer from "../hooks/useTimer";
import NavBar from "./NavBar";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const initialState: State = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
  address: "",
  phone: "",
  profileImage: null,
  profileImageUrl: null,
  emailCode: "",
  generatedCode: "",
  isEmailVerified: false,
  termsAgreed: false,
  error: "",
  emailError: "",
  modalIsOpen: false,
  privacyModalIsOpen: false,
  showPassword: false,
  showConfirmPassword: false,
  isNicknameUnique: null,
  isPhoneUnique: null,
};

type State = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  address: string;
  phone: string;
  profileImage: File | null;
  profileImageUrl: string | null;
  emailCode: string;
  generatedCode: string;
  isEmailVerified: boolean;
  termsAgreed: boolean;
  error: string;
  emailError: string;
  modalIsOpen: boolean;
  privacyModalIsOpen: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isNicknameUnique: boolean | null;
  isPhoneUnique: boolean | null;
};

type Action =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_GENERAL_ERROR"; value: string }
  | { type: "SET_EMAIL_ERROR"; value: string }
  | { type: "SET_PROFILE_IMAGE"; file: File | null; url: string | null }
  | { type: "TOGGLE_MODAL"; modal: string }
  | { type: "TOGGLE_PASSWORD"; field: string }
  | { type: "SET_EMAIL_VERIFIED"; value: boolean }
  | { type: "SET_GENERATED_CODE"; value: string }
  | { type: "SET_UNIQUE_STATUS"; field: string; value: boolean | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_GENERAL_ERROR":
      return { ...state, error: action.value };
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.value };
    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: action.file,
        profileImageUrl: action.url,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        [action.modal]: !state[action.modal as keyof State],
      };
    case "TOGGLE_PASSWORD":
      return {
        ...state,
        [action.field]: !state[action.field as keyof State],
      };
    case "SET_EMAIL_VERIFIED":
      return { ...state, isEmailVerified: action.value };
    case "SET_GENERATED_CODE":
      return { ...state, generatedCode: action.value };
    case "SET_UNIQUE_STATUS":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const SignUpForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timeLeft, isActive, start, stop } = useTimer(180);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
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
              dispatch({
                type: "SET_PROFILE_IMAGE",
                file: resizedFile,
                url: URL.createObjectURL(resizedFile),
              });
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        dispatch({
          type: "SET_GENERAL_ERROR",
          value: "이미지 로드 중 오류 발생",
        });
      };
    }
  };

  const handleProfileImageClear = () => {
    dispatch({ type: "SET_PROFILE_IMAGE", file: null, url: null });
  };

  const handleSendEmailCode = async () => {
    if (state.isEmailVerified) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "이미 이메일 인증이 완료되었습니다.",
      });
      return;
    }

    if (!state.email) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        value: "이메일을 입력해 주세요.",
      });
      return;
    }

    try {
      const response = await sendEmailCode(state.email);
      dispatch({ type: "SET_GENERATED_CODE", value: response.code });
      start();
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({
          type: "SET_GENERAL_ERROR",
          value:
            error.message || "인증번호 발송에 실패했습니다. 다시 시도해주세요.",
        });
      } else {
        dispatch({
          type: "SET_GENERAL_ERROR",
          value: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }
  };

  const checkNicknameUnique = async () => {
    try {
      const isUnique = await checkNickname(state.nickname);
      dispatch({
        type: "SET_UNIQUE_STATUS",
        field: "isNicknameUnique",
        value: isUnique,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: "SET_GENERAL_ERROR", value: error.message });
      } else {
        dispatch({
          type: "SET_GENERAL_ERROR",
          value: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }
  };

  const checkPhoneUnique = async () => {
    try {
      const isUnique = await checkPhone(state.phone);
      dispatch({
        type: "SET_UNIQUE_STATUS",
        field: "isPhoneUnique",
        value: isUnique,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: "SET_GENERAL_ERROR", value: error.message });
      } else {
        dispatch({
          type: "SET_GENERAL_ERROR",
          value: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = (): boolean => {
    dispatch({ type: "SET_GENERAL_ERROR", value: "" });
    dispatch({ type: "SET_EMAIL_ERROR", value: "" });

    if (
      !state.name ||
      !state.email ||
      !state.password ||
      !state.confirmPassword ||
      !state.nickname ||
      !state.address ||
      !state.phone ||
      !state.termsAgreed
    ) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "모든 필드를 입력하고 약관에 동의해야 합니다.",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        value: "유효한 이메일 주소를 입력해주세요.",
      });
      return false;
    }
    if (!validatePassword(state.password)) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value:
          "비밀번호는 최소 8자 이상, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다.",
      });
      return false;
    }
    if (state.password !== state.confirmPassword) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "비밀번호와 비밀번호 확인이 일치해야 합니다.",
      });
      return false;
    }
    if (state.emailCode !== state.generatedCode) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "인증번호가 일치하지 않습니다.",
      });
      return false;
    }
    if (!state.isEmailVerified) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "이메일 인증이 완료되지 않았습니다.",
      });
      return false;
    }
    if (state.isNicknameUnique === false) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "이미 사용 중인 닉네임입니다.",
      });
      return false;
    }
    if (state.isPhoneUnique === false) {
      dispatch({
        type: "SET_GENERAL_ERROR",
        value: "이미 사용 중인 전화번호입니다.",
      });
      return false;
    }
    dispatch({ type: "SET_GENERAL_ERROR", value: "" });
    return true;
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signUp({
          name: state.name,
          email: state.email,
          password: state.password,
          nickname: state.nickname,
          address: state.address,
          phone: state.phone,
          profileImage: state.profileImageUrl,
        });
        console.log("회원 가입 성공:", response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch({ type: "SET_GENERAL_ERROR", value: error.message });
        } else {
          dispatch({
            type: "SET_GENERAL_ERROR",
            value: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
          });
        }
      }
    }
  };

  const openModal = () => {
    dispatch({ type: "TOGGLE_MODAL", modal: "modalIsOpen" });
  };

  const closeModal = () => {
    dispatch({ type: "TOGGLE_MODAL", modal: "modalIsOpen" });
  };

  const openPrivacyModal = () => {
    dispatch({ type: "TOGGLE_MODAL", modal: "privacyModalIsOpen" });
  };

  const closePrivacyModal = () => {
    dispatch({ type: "TOGGLE_MODAL", modal: "privacyModalIsOpen" });
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
                value={state.name}
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
                value={state.email}
                onChange={handleChange}
                id="email"
                className="email-input"
              />
              <MdAlternateEmail className="icon" />
              <button
                type="button"
                className="email-button"
                onClick={handleSendEmailCode}
                disabled={isActive || state.isEmailVerified}
              >
                인증번호 발송
              </button>
            </div>
            {state.emailError && <p className="error">{state.emailError}</p>}
            <div className="input box full-width">
              <input
                type="text"
                placeholder="인증번호"
                name="emailCode"
                value={state.emailCode}
                onChange={handleChange}
              />
              <button
                type="button"
                className="email-confirm-button"
                onClick={() => {
                  if (state.isEmailVerified) {
                    alert("이미 이메일 인증이 완료되었습니다.");
                    return;
                  }

                  if (state.emailCode === state.generatedCode) {
                    dispatch({ type: "SET_EMAIL_VERIFIED", value: true });
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
                type={state.showPassword ? "text" : "password"}
                placeholder="비밀번호"
                name="password"
                value={state.password}
                onChange={handleChange}
                id="password"
              />
              <FaLock className="icon" />
              <span
                className="eye-icon"
                onClick={() =>
                  dispatch({ type: "TOGGLE_PASSWORD", field: "showPassword" })
                }
              >
                {state.showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input box full-width">
              <input
                type={state.showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호 확인"
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
              />
              <FaLock className="icon" />
              <span
                className="eye-icon"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_PASSWORD",
                    field: "showConfirmPassword",
                  })
                }
              >
                {state.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="별명"
                name="nickname"
                value={state.nickname}
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
              {state.isNicknameUnique === false && (
                <p className="error">이미 사용 중인 닉네임입니다.</p>
              )}
              {state.isNicknameUnique === true && (
                <p className="success">사용 가능한 닉네임입니다.</p>
              )}
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="주소"
                name="address"
                value={state.address}
                onChange={handleChange}
                id="address"
              />
              <FaAddressCard className="icon" />
            </div>
            <div className="input box full-width">
              <input
                type="text"
                placeholder="전화번호 (000-0000-0000)"
                name="phone"
                value={state.phone}
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
              {state.isPhoneUnique === false && (
                <p className="error">이미 사용 중인 전화번호입니다.</p>
              )}
              {state.isPhoneUnique === true && (
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
            {state.profileImage && (
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
                  checked={state.termsAgreed}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "termsAgreed",
                      value: e.target.checked,
                    })
                  }
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
            {state.error && <p className="error">{state.error}</p>}
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
        isOpen={state.modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>이미지 미리보기</h2>
        {state.profileImage && (
          <img
            src={URL.createObjectURL(state.profileImage)}
            alt="프로필 미리보기"
            className="image-preview"
          />
        )}
        <button onClick={closeModal} className="modal-button">
          닫기
        </button>
      </Modal>
      <Modal
        isOpen={state.privacyModalIsOpen}
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
