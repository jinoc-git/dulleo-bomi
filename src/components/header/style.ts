import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ContainerHeader = styled.header``;
export const WrapBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  width: 200px;
  height: 60px;
`;

export const LogoImg = styled.img`
  height: 100%;
`;
export const LogoTitH1 = styled.h1`
  display: inline-block;
  height: 100%;
  line-height: 60px;
  font-size: 35px;
  background: linear-gradient(160deg, rgba(202, 255, 21, 1) 0%, rgba(28, 69, 173, 0.8407738095238095) 59%);
  color: transparent;
  -webkit-background-clip: text;
  position: relative;
  top: -22px;
  left: 12px;
`;

export const UserBtnBox = styled.div``;
