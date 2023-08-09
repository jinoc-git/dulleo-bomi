import React from 'react';
import { styled } from 'styled-components';
import Layout from '../components/common/layout/Layout';
import MyProfile from '../components/myProfile/MyProfile';

const MyPage = () => {
  return (
    <Layout>
      <MyProfile />
      <ListSection>
        <ListBox>내가 좋아요 한 코스</ListBox>
        <ListBox>내가 쓴 댓글 목록</ListBox>
      </ListSection>
    </Layout>
  );
};

const ListSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-flow: row wrap;
`;

const ListBox = styled.div`
  height: 500px;
  flex-basis: 500px;
  flex-grow: 1;
  border-radius: 10px;
  background-color: #9acdde;
`;

export default MyPage;
