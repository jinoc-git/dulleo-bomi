import { Form as AntdForm } from 'antd';
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
