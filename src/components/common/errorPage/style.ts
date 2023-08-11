import { styled } from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ErrorCode = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
`;
