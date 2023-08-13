import React from 'react';
import * as St from './style';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return <St.LayoutContainer>{children}</St.LayoutContainer>;
};

export default Layout;
