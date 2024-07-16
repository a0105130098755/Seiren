import React, { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { checkExist } from "../../api/AuthApi";

const NicknamePhoneVerification = ({ nickname, phone, onChange, errors }) => {
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const [isPhoneUnique, setIsPhoneUnique] = useState(null);

  const checkExistence = async (type, value) => {
    try {
      const isUnique = await checkExist({ type, value });
      if (type === "nickname") {
        setIsNicknameUnique(isUnique);
      } else if (type === "phone") {
        setIsPhoneUnique(isUnique);
      }
    } catch (error) {
      console.error(
        `${type} 중복 확인 중 오류:`,
        error.message || "알 수 없는 오류"
      );
    }
  };

  return (
    <>
      <div className="input box full-width">
        <input
          type="text"
          placeholder="별명"
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
        <FaUser className="icon" />
        <button
          type="button"
          className="check-button"
          onClick={() => checkExistence("nickname", nickname)}
        >
          중복 확인
        </button>
      </div>
      {errors.nickname && <p className="error">{errors.nickname}</p>}
      {isNicknameUnique === false && (
        <p className="error">이미 사용 중인 닉네임입니다.</p>
      )}
      {isNicknameUnique === true && (
        <p className="success">사용 가능한 닉네임입니다.</p>
      )}

      <div className="input box full-width">
        <input
          type="text"
          placeholder="전화번호 (000-0000-0000)"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <FaPhone className="icon" />
        <button
          type="button"
          className="check-button"
          onClick={() => checkExistence("phone", phone)}
        >
          중복 확인
        </button>
      </div>
      {errors.phone && <p className="error">{errors.phone}</p>}
      {isPhoneUnique === false && (
        <p className="error">이미 사용 중인 전화번호입니다.</p>
      )}
      {isPhoneUnique === true && (
        <p className="success">사용 가능한 전화번호입니다.</p>
      )}
    </>
  );
};

export default NicknamePhoneVerification;
