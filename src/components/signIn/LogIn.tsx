import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Input, Form, Button, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [failLogin, setFailLogin] = useState<Boolean>(false);
  const navigate = useNavigate();
  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const signIn = async (event: any) => {
    // event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      setFailLogin(true);
      console.error(error);
      // console.log('에러');
    }
  };
  const chageAlertStateHandle = () => {
    setFailLogin(false);
  };
  return (
    <LogInContainer>
      <Form onFinish={signIn} name="login" initialValues={{ remember: true }} autoComplete="off">
        {failLogin && <Alert message="로그인 실패" description="아이디 또는 비밀번호를 확인해주세요" type="warning" showIcon closable onClick={chageAlertStateHandle} />}

        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
          ]}
        >
          <Input type="email" id="email" onChange={onChangeEmail} />
        </Form.Item>
        <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input type="password" id="password" onChange={onChangePassword} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </LogInContainer>
  );
}

export default SignIn;

const LogInContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
