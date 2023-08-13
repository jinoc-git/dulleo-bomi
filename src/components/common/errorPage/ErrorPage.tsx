import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorpage from '../../../assets/errorpage.png';
import * as St from './style';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToPreviousPage = () => {
    window.history.back();
  };

  return (
    <St.ErrorWrapper>
      <St.ErrorImg src={errorpage} alt="404에러이미지" />
      <St.ErrorMessageBox>
        <St.ErrorMessage>죄송합니다. 찾으려는 페이지를 찾을 수 없습니다. </St.ErrorMessage>
        <St.ErrorMessage>존재하지 않는 주소를 입력하셨거나, </St.ErrorMessage>
        <St.ErrorMessage>요청하신 주소가 변경, 삭제되어 찾을 수 없습니다. </St.ErrorMessage>
      </St.ErrorMessageBox>
      <St.ErrorBtnBox>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로
        </Button>
        <Button type="primary" onClick={handleGoToPreviousPage}>
          이전으로
        </Button>
      </St.ErrorBtnBox>
    </St.ErrorWrapper>
  );
};

export default ErrorPage;
