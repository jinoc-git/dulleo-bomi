import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { styled } from 'styled-components';
import { message } from 'antd';
import Layout from '../components/common/layout/Layout';
import MyProfile from '../components/myProfile/MyProfile';
import MyComments from '../components/myComments/MyComments';
import MyLikes from '../components/myLikes/MyLikes';

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        message.error('로그인이 필요합니다');
        navigate('/signin');
      }
    });
  }, [navigate]);

  return (
    <Layout>
      <h2>마이 페이지</h2>
      <MyProfile />
      <ListSection>
        <MyLikes />
        <MyComments />
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

export default MyPage;
