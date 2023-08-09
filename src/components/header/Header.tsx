import Layout from '../common/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import * as St from './style';
import { Button } from 'antd';
import SearchForm from '../searchForm/SearchForm';

const Header = () => {
  const navigate = useNavigate();

  return (
    <St.ContainerHeader>
      <Layout>
        <St.WrapBox>
          <St.Logo>
            <Link to={'/'}>logo</Link>
          </St.Logo>
          <SearchForm />
          <Button>로그인</Button>
          <Button>회원가입</Button>
        </St.WrapBox>
      </Layout>
    </St.ContainerHeader>
  );
};

export default Header;
