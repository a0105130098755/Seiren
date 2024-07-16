import React, { useState } from "react";
import { updateUserInfo } from "../../api/userApi"; // 프로필 업데이트 API 함수 임포트
import CryptoJS from "crypto-js";
import // ... (스타일 컴포넌트 import)
"./MyPageStyles";

// UserInfoSection 컴포넌트: 사용자 정보를 표시하고 수정하는 섹션
const UserInfoSection = ({ userInfo, setUserInfo }) => {
  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중인 사용자 정보 상태
  const [editedInfo, setEditedInfo] = useState(userInfo || {});
  // 에러 상태
  const [error, setError] = useState(null);
  // 선택된 파일 이름 상태
  const [fileName, setFileName] = useState("");

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  // 사용자 정보 저장 핸들러
  const handleSave = async () => {
    try {
      // 닉네임 암호화
      const encryptedNickname = CryptoJS.AES.encrypt(
        editedInfo.nickname,
        process.env.REACT_APP_SECRET_KEY
      ).toString();

      // 프로필 업데이트 API 호출
      const response = await updateUserInfo({
        ...editedInfo,
        nickname: encryptedNickname,
      });

      // 응답으로 받은 닉네임 복호화
      const decryptedNickname = CryptoJS.AES.decrypt(
        response.nickname,
        process.env.REACT_APP_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      // 상태 업데이트 및 수정 모드 종료
      setUserInfo({ ...response, nickname: decryptedNickname });
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("프로필 업데이트에 실패했습니다.");
      console.error(err);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedInfo({ ...editedInfo, profile: file });
    setFileName(file ? file.name : "");
  };

  return (
    <UserInfoContainer>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isEditing ? (
        // 수정 모드 UI
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setIsEditing(false)}>X</CloseButton>
            <Form>
              {/* 닉네임 입력 필드 */}
              <Input
                type="text"
                placeholder="닉네임"
                value={editedInfo.nickname}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, nickname: e.target.value })
                }
              />
              {/* 이메일 입력 필드 */}
              <Input
                type="email"
                placeholder="새 이메일"
                value={editedInfo.email}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, email: e.target.value })
                }
              />
              {/* 비밀번호 입력 필드 */}
              <Input
                type="password"
                placeholder="새 비밀번호"
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, password: e.target.value })
                }
              />
              {/* 파일 업로드 UI */}
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
        // 정보 표시 UI
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
