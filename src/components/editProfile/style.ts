import { Button as AntdButton, Form as AntdForm } from 'antd';
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: none !important;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;

  &:hover {
    border: 2px solid #a5cc9c;
  }
`;
