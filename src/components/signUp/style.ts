import { Button as AntdButton, Form as AntdForm } from 'antd';
import { styled } from 'styled-components';

export const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px - 235.97px);
`;

export const SignUpForm = styled(AntdForm)`
  min-width: 360px;
  max-width: 900px;
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

export const CustomFileInput = styled.input`
  &::-webkit-file-upload-button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    color: #ffffff;
    background-color: #9acdde;
    transition: background-color 0.3s;

    &:hover {
      background-color: #b8e3e8;
    }
    &:active {
      background-color: #67bed0;
    }
  }
`;

export const NavigateToSignInContainer = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export const SignInText = styled.span`
  color: #9acdde;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #b8e3e8;
  }

  &:active {
    color: #67bed0;
  }
`;
