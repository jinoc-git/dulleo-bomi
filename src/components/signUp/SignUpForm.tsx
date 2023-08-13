import { Form, Input, message, Spin } from 'antd';
import { FirebaseError } from 'firebase/app';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';
import Layout from '../common/layout/Layout';
import { signUpWithFB } from '../../api/firebaseAuth';
import useSignUpFormValidator from '../../hooks/useSignUpFormValidator';

export type SignUpFormData = {
  profileImage: File[];
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

const SignUpForm = (): ReactElement => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { passwordValidator, confirmPasswordValidator, nickNameValidator } =
    useSignUpFormValidator(form);

  const onSubmitSignUpHandler = async (values: unknown) => {
    setIsLoading(true);
    const data = values as SignUpFormData;
    try {
      if (selectedFile) {
        const userInfo = await signUpWithFB(data, selectedFile);
        useUserStore.getState().refreshUserInfo(userInfo);

        message.success('회원가입이 성공적으로 처리되었습니다');
        setError(null);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setEmailError(err.message);
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <St.SignUpFormContainer>
        <St.SignUpForm
          form={form}
          onFinish={onSubmitSignUpHandler}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="프로필 이미지"
            name="profileImage"
            rules={[{ required: true, message: '이미지를 업로드해주세요.' }]}
          >
            <St.CustomFileInput type="file" id="profileImage" onChange={handleFileChange} />
          </Form.Item>
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="프로필 이미지 미리보기"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          )}
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: '이메일 주소를 입력해주세요.' },
              { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
            ]}
            validateStatus={emailError ? 'error' : ''}
            help={emailError}
          >
            <Input type="email" id="email" onChange={() => setEmailError(null)} />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, passwordValidator]}
          >
            <Input type="password" id="password" />
          </Form.Item>

          <Form.Item
            label="비밀번호 확인"
            name="confirmPassword"
            rules={[
              { required: true, message: '비밀번호를 한 번 더 입력해주세요.' },
              confirmPasswordValidator,
            ]}
          >
            <Input type="password" id="confirmPassword" />
          </Form.Item>

          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              { required: true, message: '닉네임을 입력해주세요.' },
              { min: 2, max: 6, message: '닉네임은 2~6글자로 제한됩니다.' },
              nickNameValidator,
            ]}
          >
            <Input type="text" id="nickname" />
          </Form.Item>
          {error && <p>{error}</p>}
          <St.ButtonContainer>
            <St.Button type="default" htmlType="submit">
              회원가입
              {isLoading && <Spin style={{ marginLeft: '8px' }} />}
            </St.Button>
          </St.ButtonContainer>
          <St.NavigateToSignInContainer>
            이미 회원이신가요? &nbsp;
            <St.SignInText onClick={() => navigate('/signin')}>로그인으로 이동</St.SignInText>
          </St.NavigateToSignInContainer>
        </St.SignUpForm>
      </St.SignUpFormContainer>
    </Layout>
  );
};

export default SignUpForm;
