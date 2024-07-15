import React, { useState } from "react";
import { updateUserInfo } from "../../api/Api"; // 프로필 업데이트 API 함수 임포트
import CryptoJS from "crypto-js";
import {
  Modal,
  ModalContent,
  Form,
  Input,
  SubmitButton,
  CloseButton,
  UserInfoContainer,
  UserInfoItem,
  UserInfoLabel,
  UserInfoValue,
  EditButton,
  FileInputContainer,
  CustomFileInputButton,
  HiddenFileInput,
  FileName,
  ProfileImage,
} from "./MyPageStyles";

const UserInfoSection = ({ userInfo, setUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo || {});
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  const handleSave = async () => {
    try {
      const encryptedNickname = CryptoJS.AES.encrypt(
        editedInfo.nickname,
        process.env.REACT_APP_SECRET_KEY
      ).toString();

      // 프로필 업데이트 API 호출
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedInfo({ ...editedInfo, profile: file });
    setFileName(file ? file.name : "");
  };

  return (
    <UserInfoContainer>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isEditing ? (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setIsEditing(false)}>X</CloseButton>
            <Form>
              <Input
                type="text"
                placeholder="닉네임"
                value={editedInfo.nickname}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, nickname: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="새 이메일"
                value={editedInfo.email}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, email: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="새 비밀번호"
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, password: e.target.value })
                }
              />
              <FileInputContainer>
                <FileName>{fileName || "프로필 이미지 선택"}</FileName>
                <CustomFileInputButton>
                  선택
                  <HiddenFileInput type="file" onChange={handleFileChange} />
                </CustomFileInputButton>
              </FileInputContainer>
              <SubmitButton onClick={handleSave}>저장</SubmitButton>
            </Form>
          </ModalContent>
        </Modal>
      ) : (
        <div>
          <UserInfoItem>
            <UserInfoLabel>닉네임:</UserInfoLabel>
            <UserInfoValue>{userInfo.nickname}</UserInfoValue>
          </UserInfoItem>
          <UserInfoItem>
            <UserInfoLabel>프로필:</UserInfoLabel>
            <ProfileImage src={userInfo.profile} alt="프로필" />
          </UserInfoItem>
          <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
        </div>
      )}
    </UserInfoContainer>
  );
};

export default UserInfoSection;
