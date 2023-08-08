import Layout from '../common/layout/Layout';
import { Link } from 'react-router-dom';
import * as St from './style';

const Header = () => {
  return (
    <St.ContainerHeader>
      <Layout>
        <h1>
          <Link to={'/'}></Link>
        </h1>
      </Layout>
    </St.ContainerHeader>
  );
};

export default Header;
