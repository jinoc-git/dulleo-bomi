import { message } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Layout from '../components/common/layout/Layout';
import MyComments from '../components/myComments/MyComments';
import MyLikes from '../components/myLikes/MyLikes';
import MyProfile from '../components/myProfile/MyProfile';
import { auth } from '../firebase/firebaseConfig';

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
      {/* <h2>마이 페이지</h2> */}
      <MyPageContainer>
        <MyProfile />
        <ListSection>
          <MyLikes />
          <MyComments />
        </ListSection>
      </MyPageContainer>
    </Layout>
  );
};

const ListSection = styled.section`
  width: 100%;
  display: flex;
  gap: 15px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const MyPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  min-height: calc(100vh - 180px - 235.97px);

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export default MyPage;
