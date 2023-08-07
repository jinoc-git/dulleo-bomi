import React from 'react';
import { styled } from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return <StContainer>{children}</StContainer>;
};

export default Layout;

const StContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
`;
