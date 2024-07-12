import React, { useState } from "react";
import { updateUserInfo } from "../../api/Api";
import CryptoJS from "crypto-js";

const UserInfoSection = ({ userInfo, setUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      const encryptedNickname = CryptoJS.AES.encrypt(
        editedInfo.nickname,
        process.env.REACT_APP_SECRET_KEY
      ).toString();

      const response = await updateUserInfo({
        ...editedInfo,
        nickname: encryptedNickname,
      });

      const decryptedNickname = CryptoJS.AES.decrypt(
        response.nickname,
        process.env.REACT_APP_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      setUserInfo({ ...response, nickname: decryptedNickname });
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("프로필 업데이트에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>내 정보</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isEditing ? (
        <div>
          <input
            value={editedInfo.nickname}
            onChange={(e) =>
              setEditedInfo({ ...editedInfo, nickname: e.target.value })
            }
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </div>
      ) : (
        <div>
          <p>닉네임: {userInfo.nickname}</p>
          <p>이메일: {userInfo.email}</p>
          <p>포인트: {userInfo.point}</p>
          <img src={userInfo.profile} alt="프로필" width="100" />
          <button onClick={() => setIsEditing(true)}>수정</button>
        </div>
      )}
    </div>
  );
};

export default UserInfoSection;
