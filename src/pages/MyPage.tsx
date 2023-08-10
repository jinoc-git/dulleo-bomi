import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { styled } from 'styled-components';
import Layout from '../components/common/layout/Layout';
import MyProfile from '../components/myProfile/MyProfile';
import MyComments from '../components/myComments/MyComments';

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert('로그인이 필요합니다.');
        navigate('/signin');
      }
    });
  }, [navigate]);

  return (
    <Layout>
      <h2>마이 페이지</h2>
      <MyProfile />
      <ListSection>
        <ListBox>내가 좋아요 한 코스</ListBox>
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

const ListBox = styled.div`
  height: 500px;
  flex-basis: 500px;
  flex-grow: 1;
  border-radius: 10px;
  background-color: #9acdde;
`;

export default MyPage;
