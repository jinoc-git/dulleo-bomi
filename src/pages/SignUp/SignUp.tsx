import { Button, Form, FormInstance, Input } from 'antd';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { auth, storage } from '../../firebase/firebaseConfig';
import * as St from './style';

type SignUpFormData = {
  profileImage: FileList;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const { user } = userCredential;

      if (user && data.profileImage.length > 0) {
        const filePath = `profiles/${user.uid}/profile_picture`;
        const imageRef = ref(storage, filePath);
        const file = data.profileImage[0];

        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);

        await updateProfile(user, {
          displayName: data.nickname,
          photoURL: downloadURL,
        });
      }
      // 알럿으로 바꾸기
      alert('회원가입이 성공적으로 처리되었습니다');
      console.log('회원가입 성공:', userCredential);
      setError(null);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setEmailError('이미 존재하는 이메일 주소입니다.');
        } else {
          setError(err.message);
        }
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const passwordValidator = () => ({
    validator(_: unknown, value: string) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!value || passwordRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('비밀번호는 6자리 이상 숫자+영문자 조합으로 작성해주세요.'));
    },
  });

  const confirmPasswordValidator = (formInstance: FormInstance) => ({
    validator(_: unknown, value: string) {
      if (!value || formInstance.getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
    },
  });

  return (
    <St.SignUpContainer>
      <Form onFinish={onSubmit}>
        <Form.Item label="프로필 이미지" name="profileImage" rules={[{ required: true, message: '이미지를 업로드해주세요.' }]}>
          <Input type="file" id="profileImage" />
        </Form.Item>

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

        <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, passwordValidator()]}>
          <Input type="password" id="password" />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="confirmPassword"
          rules={[
            { required: true, message: '비밀번호를 한 번 더 입력해주세요.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
        >
          <Input type="password" id="confirmPassword" />
        </Form.Item>

        <Form.Item label="닉네임" name="nickname" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
          <Input type="text" id="nickname" />
        </Form.Item>
        {error && <p>{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </St.SignUpContainer>
  );
};

export default SignUp;
