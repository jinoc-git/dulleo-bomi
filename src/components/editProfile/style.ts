import { Button as AntdButton, Form as AntdForm } from 'antd';
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const Button = styled(AntdButton)`
  background-color: #9acdde;
  border-color: transparent;
  color: #ffffff;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #b8e3e8;
  }

  &:active {
    background-color: #67bed0;
  }
`;

export const Form = styled(AntdForm)`
  text-align: left;
  width: 100%;
  height: 100%;
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
