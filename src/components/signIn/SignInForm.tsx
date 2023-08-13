import React, { useState } from 'react';
import { Input, Form, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as St from './style';
import { signInWithFB } from '../../api/firebaseAuth';
import Layout from '../common/layout/Layout';
import { useTextInput } from '../../hooks/useTextInput';

type FailError = {
  isFail: boolean;
  message: string;
};

const SignInForm = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useTextInput<string>('');
  const [password, setPassword] = useTextInput<string>('');
  const [failLogin, setFailLogin] = useState<FailError>();
  const navigate = useNavigate();

  const onSubmitSignInHandler = async () => {
    try {
      await signInWithFB(email, password);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setFailLogin({ isFail: true, message: error.message });
      }
    }
  };

  const resetFailLoginState = () => {
    setFailLogin({ isFail: false, message: '' });
  };

  return (
    <Layout>
      <St.SignInFormContainer>
        <St.SignInForm
          form={form}
          onFinish={onSubmitSignInHandler}
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          {failLogin && (
            <Alert
              message="로그인 실패"
              description="아이디 또는 비밀번호를 확인해주세요"
              type="warning"
              showIcon
              closable
              onClick={resetFailLoginState}
            />
          )}

          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: '이메일을 입력해주세요' },
              { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
            ]}
          >
            <Input type="email" id="email" onChange={setEmail} />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input type="password" id="password" onChange={setPassword} />
          </Form.Item>
          <St.ButtonContainer>
            <St.Button type="primary" htmlType="submit">
              로그인
            </St.Button>
          </St.ButtonContainer>
          <St.NavigateToSignUpContainer>
            회원이 아니신가요? &nbsp;
            <St.SignUpText onClick={() => navigate('/signup')}>회원가입으로 이동</St.SignUpText>
          </St.NavigateToSignUpContainer>
        </St.SignInForm>
      </St.SignInFormContainer>
    </Layout>
  );
};

export default SignInForm;
