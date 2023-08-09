import Layout from '../common/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import * as St from './style';
import { Button } from 'antd';
import { logoColor } from '../../assets';

const Header = () => {
  const navigate = useNavigate();

  return (
    <St.ContainerHeader>
      <Layout>
        <St.WrapBox>
          <St.Logo to={'/'}>
            <St.LogoImg src={logoColor} />
            <St.LogoTitH1>둘러보미</St.LogoTitH1>
          </St.Logo>

          <St.UserBtnBox>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </St.UserBtnBox>
        </St.WrapBox>
      </Layout>
    </St.ContainerHeader>
  );
};

export default Header;
