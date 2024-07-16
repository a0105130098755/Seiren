import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHiring } from "../../api/hiringApi";
import styled from "styled-components";

const CreateHiringContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 150px auto 20px auto;
  padding: 60px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans", sans-serif;

  @media (max-width: 768px) {
    margin: 100px 20px;
    padding: 40px 20px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    margin: 80px 10px;
    padding: 20px 10px;
    border-radius: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccd0cf;
  border-radius: 10px;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #4a5c6a;
    box-shadow: 0 0 0 2px rgba(74, 92, 106, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccd0cf;
  border-radius: 10px;
  height: 200px;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #4a5c6a;
    box-shadow: 0 0 0 2px rgba(74, 92, 106, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #253745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s;
  font-size: 18px;

  &:hover {
    background-color: #253745;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

/**
 * 구인구직 글 작성 컴포넌트
 */
function CreateHiring() {
  // 구인구직 글 데이터 상태
  const [hiringData, setHiringData] = useState({
    title: "",
    content: "",
    max: 1,
    location: "",
  });
  const navigate = useNavigate();

  /**
   * 입력 필드 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHiringData((prev) => ({
      ...prev,
      [name]: name === "max" ? parseInt(value) : value,
    }));
  };

  /**
   * 폼 제출 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createHiring({
        ...hiringData,
        current: 1, // 현재 인원 수 (글 작성자)
      });
      if (response) {
        alert("구인구직 글이 성공적으로 등록되었습니다.");
        navigate("/job");
      }
    } catch (error) {
      console.error("구인구직 글 등록에 실패했습니다.", error);
      alert(error.message || "구인구직 글 등록에 실패했습니다.");
    }
  };

  return (
    <CreateHiringContainer>
      <h2>구인구직 글 작성</h2>
      <Form onSubmit={handleSubmit}>
        {/* 제목 입력 필드 */}
        <Input
          name="title"
          value={hiringData.title}
          onChange={handleChange}
          placeholder="제목"
          required
        />
        {/* 내용 입력 필드 */}
        <TextArea
          name="content"
          value={hiringData.content}
          onChange={handleChange}
          placeholder="내용"
          required
        />
        {/* 최대 인원 입력 필드 */}
        <Input
          type="number"
          name="max"
          value={hiringData.max}
          onChange={handleChange}
          placeholder="최대 인원"
          min="1"
          required
        />
        {/* 지역 입력 필드 */}
        <Input
          name="location"
          value={hiringData.location}
          onChange={handleChange}
          placeholder="지역"
          required
        />
        {/* 제출 버튼 */}
        <Button type="submit">등록</Button>
      </Form>
    </CreateHiringContainer>
  );
}

export default CreateHiring;
