import { Button } from 'antd';
import React from 'react';
import errorpage from '../../../assets/errorpage.png';
import * as St from './style';

const ErrorPage: React.FC = () => {
  return (
    <St.ErrorWrapper>
      {/* <St.ErrorCode>404</St.ErrorCode> */}
      <img src={errorpage} alt="404에러이미지" />
      <St.ErrorMessage>죄송합니다. 찾으려는 페이지를 찾을 수 없습니다. </St.ErrorMessage>
      <St.ErrorMessage>존재하지 않는 주소를 입력하셨거나, </St.ErrorMessage>
      <St.ErrorMessage>요청하신 주소가 변경, 삭제되어 찾을 수 없습니다. </St.ErrorMessage>
      <Button>메인으로</Button>
      <Button>이전으로</Button>
    </St.ErrorWrapper>
  );
};

export default ErrorPage;
