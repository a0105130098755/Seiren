import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 0;
  padding: 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
`;

const ProfileField = styled.p`
  margin: 5px 0;
`;

const EditProfileButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#ff6b6b" : "#a5a5a5")};
  color: white;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostItem = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 10px;
`;

const PostImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ddd;
  margin-right: 10px;
`;

const PostContent = styled.div`
  flex-grow: 1;
`;

const MyPage = () => {
  return (
    <PageContainer>
      <ProfileSection>
        <ProfileImage />
        <ProfileInfo>
          <ProfileField>User Email: example@email.com</ProfileField>
          <ProfileField>Name: John Doe</ProfileField>
          <ProfileField>Nickname: JohnD</ProfileField>
          <ProfileField>Phone: 123-456-7890</ProfileField>
          <ProfileField>Point: 1000</ProfileField>
        </ProfileInfo>
        <EditProfileButton>Edit Profile</EditProfileButton>
      </ProfileSection>

      <ButtonGroup>
        <Button>게시글</Button>
        <Button primary>구인글</Button>
      </ButtonGroup>

      <PostList>
        {[1, 2, 3].map((item) => (
          <PostItem key={item}>
            <PostImage />
            <PostContent>
              <h3>JohnDoe</h3>
              <h4>Title</h4>
              <p>Position : a / b / c / d</p>
              <p>Content</p>
            </PostContent>
          </PostItem>
        ))}
      </PostList>
    </PageContainer>
  );
};

export default MyPage;
