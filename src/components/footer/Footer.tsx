import Layout from '../common/layout/Layout';
import * as St from './style';

const Footer = () => {
  return (
    <St.ContainerFooter>
      <Layout>
        <St.FootTit>React 6</St.FootTit>
        <St.FootInfo></St.FootInfo>
      </Layout>
    </St.ContainerFooter>
  );
};

export default Footer;
