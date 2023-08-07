import { styled } from 'styled-components';
import Layout from '../common/Layout';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <StHeader>
      <Layout>
        <h1>
          <Link to={'/'}></Link>
        </h1>
      </Layout>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header``;
