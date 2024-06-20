import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../firebase"; // firebase 설정 파일 경로에 맞게 수정
import Modal from "react-modal";
import "./ImageUploader.css";

interface ImageUploaderProps {
  usernickname: string;
  uploadTrigger: boolean;
  setProfileImageUrl: (url: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  usernickname,
  uploadTrigger,
  setProfileImageUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (uploadTrigger && file) {
      uploadImage();
    }
  }, [uploadTrigger]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
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
              setFile(resizedFile);
              setPreviewUrl(URL.createObjectURL(resizedFile));
              setError("");
            } else {
              setError("이미지 변환 중 오류가 발생했습니다.");
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        setError("이미지를 로드하는 중 오류가 발생했습니다.");
      };
    }
  };

  const uploadImage = () => {
    if (!file) return;
    const fileRef = ref(storage, `images/${usernickname}`);
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("이미지 파이어베이스 업로드 성공");
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("경로 : " + url);
          setProfileImageUrl(url);
          saveImageUrlToFirestore(url);
        });
      })
      .catch((error) => {
        console.error("파일 업로드 중 오류가 발생했습니다.", error);
        setError("파일 업로드 중 오류가 발생했습니다.");
      });
  };

  const saveImageUrlToFirestore = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, "images"), {
        usernickname,
        imageUrl: url,
        createdAt: new Date(),
      });
      console.log("이미지 URL이 Firestore에 저장되었습니다. ID: ", docRef.id);
    } catch (error) {
      console.error(
        "이미지 URL을 Firestore에 저장하는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {previewUrl && <button onClick={openModal}>미리보기</button>}
      {error && <p>{error}</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Image Preview</h2>
        {previewUrl && <img src={previewUrl} alt="Profile preview" />}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ImageUploader;
