import Layout from './Layout';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <StFooter>
      <Layout>
        <StFootTit>React 6</StFootTit>
        <StFootInfo></StFootInfo>
      </Layout>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  padding: 20px 0;
  background-color: #efefef;
`;
const StFootTit = styled.h4``;
const StFootInfo = styled.div``;
