import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHiring } from "../../api/Api";
import styled from "styled-components";

const CreateHiringContainer = styled.div`
  max-width: 600px;
  margin: 80px auto 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Noto Sans", sans-serif;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 150px;
  font-family: "Noto Sans", sans-serif;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

function CreateHiring() {
  const [hiringData, setHiringData] = useState({
    title: "",
    content: "",
    max: 1,
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHiringData((prev) => ({
      ...prev,
      [name]: name === "max" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createHiring({
        ...hiringData,
        current: 1,
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
        <Input
          name="title"
          value={hiringData.title}
          onChange={handleChange}
          placeholder="제목"
          required
        />
        <TextArea
          name="content"
          value={hiringData.content}
          onChange={handleChange}
          placeholder="내용"
          required
        />
        <Input
          type="number"
          name="max"
          value={hiringData.max}
          onChange={handleChange}
          placeholder="최대 인원"
          min="1"
          required
        />
        <Input
          name="location"
          value={hiringData.location}
          onChange={handleChange}
          placeholder="지역"
          required
        />
        <Button type="submit">등록</Button>
      </Form>
    </CreateHiringContainer>
  );
}

export default CreateHiring;
