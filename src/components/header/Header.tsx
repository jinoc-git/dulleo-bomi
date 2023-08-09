import Layout from '../common/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import * as St from './style';
import { Button, Input } from 'antd';
import { logoColor } from '../../assets';

const Header = () => {
  const navigate = useNavigate();
  return (
    <St.ContainerHeader>
      <Layout>
        <St.WrapBox>
          <St.Logo>
            <Link to={'/'}>
              <img src={logoColor} />{' '}
            </Link>
          </St.Logo>
          <St.SearchBox>
            <label htmlFor="">검색</label>
            <Input type="text" />
            <Button>검색버튼</Button>
          </St.SearchBox>
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
