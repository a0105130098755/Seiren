import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHiring } from "../../api/Api";
import styled from "styled-components";

const CreateHiringContainer = styled.div`
  max-width: 600px;
  margin: 80px auto 20px auto; /* Adjusted for navbar */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 150px;
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [max, setMax] = useState(1);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hiringData = {
        title,
        content,
        current: 1,
        max,
        location,
      };
      const response = await createHiring(hiringData);
      if (response) {
        alert("구인구직 글이 성공적으로 등록되었습니다.");
        navigate("/job");
      }
    } catch (error) {
      console.error("구인구직 글 등록에 실패했습니다.", error);
    }
  };

  return (
    <CreateHiringContainer>
      <h2>구인구직 글 작성</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          required
        />
        <Input
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          placeholder="최대 인원"
          min="1"
          required
        />
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="지역"
          required
        />
        <Button type="submit">등록</Button>
      </Form>
    </CreateHiringContainer>
  );
}

export default CreateHiring;
