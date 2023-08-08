import React from 'react';
import { styled } from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Layout from '../components/common/layout/Layout';

const MyPage = () => {
  return (
    <Layout>
      <ProfileBox>
        <Avatar size={64} icon={<UserOutlined />} />
        닉네임 이메일
      </ProfileBox>
      <ListSection>
        <ListBox>내가 좋아요 한 코스</ListBox>
        <ListBox>내가 쓴 댓글 목록</ListBox>
      </ListSection>
    </Layout>
  );
};

const ProfileBox = styled.div`
  height: 150px;
  margin-bottom: 15px;
  background-color: gray;
`;

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
  background-color: gray;
`;

export default MyPage;
