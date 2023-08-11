import { Form, FormInstance, Input, message, Spin } from 'antd';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import { UserInfo, useUserStore } from '../../zustand/UserStore';
import * as St from './style';

type SignUpFormData = {
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
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values: unknown) => {
    setIsLoading(true);
    const data = values as SignUpFormData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const { user } = userCredential;

      if (user) {
        let photoURL = '';
        if (selectedFile) {
          const filePath = `profiles/${user.uid}/profile_picture`;
          const imageRef = ref(storage, filePath);
          const file = selectedFile;

          await uploadBytes(imageRef, file);
          photoURL = await getDownloadURL(imageRef);
        }

        await updateProfile(user, {
          displayName: data.nickname,
          photoURL: photoURL,
        });

        const userInfo: UserInfo = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };

        await addDoc(collection(db, 'users'), userInfo);
        useUserStore.getState().refreshUserInfo(userInfo);

        message.success('회원가입이 성공적으로 처리되었습니다');
        setError(null);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setEmailError('이미 존재하는 이메일 주소입니다.');
        } else {
          setError(err.message);
        }
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
        setIsLoading(false);
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

  const checkNicknameDuplication = async (nickname: string): Promise<boolean> => {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('displayName', '==', nickname)),
    );
    return !querySnapshot.empty;
  };

  const nicknameValidator = {
    validator: async (_: unknown, value: string) => {
      if (!value) {
        return Promise.resolve();
      }
      const isDuplicated = await checkNicknameDuplication(value);
      if (isDuplicated) {
        return Promise.reject(new Error('이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.'));
      }
      return Promise.resolve();
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <St.SignUpFormContainer>
      <St.SignUpForm
        form={form}
        onFinish={onSubmit}
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
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, passwordValidator()]}
        >
          <Input type="password" id="password" />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="confirmPassword"
          rules={[
            { required: true, message: '비밀번호를 한 번 더 입력해주세요.' },
            confirmPasswordValidator(form),
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
            nicknameValidator,
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
          이미 회원이신가요?{' '}
          <St.SignInText onClick={() => navigate('/signin')}>로그인으로 이동</St.SignInText>
        </St.NavigateToSignInContainer>
      </St.SignUpForm>
    </St.SignUpFormContainer>
  );
};

export default SignUpForm;
