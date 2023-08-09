import { Button as AntdButton, Form as AntdForm } from 'antd';
import { styled } from 'styled-components';

export const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignUpForm = styled(AntdForm)`
  width: 50%;
`;

export const ButtonContainer = styled(AntdForm.Item)`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled(AntdButton)`
  background-color: #9acdde;
  border-color: transparent;
  color: #ffffff;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #b8e3e8;
    border-color: transparent;
    color: #ffffff;
  }

  &:active {
    background-color: #67bed0;
    border-color: transparent;
    color: #ffffff;
  }
`;
