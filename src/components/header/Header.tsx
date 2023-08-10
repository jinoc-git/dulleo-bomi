import { Avatar, Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoColor } from '../../assets';
import { useUserStore } from '../../zustand/UserStore';
import Layout from '../common/layout/Layout';
import * as St from './style';

const Header = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setupAuthObserver = useUserStore((state) => state.setupAuthObserver);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const unsubscribe = setupAuthObserver();
    return () => {
      unsubscribe();
    };
  }, [setupAuthObserver]);

  return (
    <St.ContainerHeader>
      <Layout>
        <St.WrapBox>
          <St.Logo to={'/'}>
            <St.LogoImg src={logoColor} />
            <St.LogoTitH1>둘러보미</St.LogoTitH1>
          </St.Logo>
          <St.UserBtnBox>
            {isLoggedIn && user ? (
              <>
                <span>{user.displayName}님 반갑습니다</span>
                <Avatar
                  src={user.photoURL}
                  alt="프로필 사진"
                  onClick={() => navigate('/mypage')}
                  style={{ cursor: 'pointer' }}
                />
                <Button onClick={() => logout()}>로그아웃</Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/signin')}>로그인</Button>
                <Button onClick={() => navigate('/signup')}>회원가입</Button>
              </>
            )}
          </St.UserBtnBox>
        </St.WrapBox>
      </Layout>
    </St.ContainerHeader>
  );
};

export default Header;
