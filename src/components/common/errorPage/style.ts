import { styled } from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const ErrorImg = styled.img`
  width: 50%;
  object-fit: cover;
`;

export const ErrorCode = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ErrorMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  margin: 20px;
`;

export const ErrorMessage = styled.p`
  font-size: 15px;
`;

export const ErrorBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 20px;
`;
