import { Form, Input, Spin, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useTextInput } from '../../hooks/useTextInput';
import { useModal } from '../../zustand/ModalStore';
import { UserInfo, useUserStore } from '../../zustand/UserStore';
import * as St from './style';
import {
  setUserProfileImageAndDisplayName,
  updateUserDisplayName,
  updateUserProfileImage,
} from '../../api/firebaseAuth';

export const EditProfileForm = () => {
  const { user, refreshUserInfo } = useUserStore((state) => ({
    user: state.user,
    refreshUserInfo: state.refreshUserInfo,
  }));

  const { photoURL, email, displayName } = user ?? {};
  const [form] = Form.useForm();
  const { closeModal } = useModal();

  const [password, onPasswordChangeHandler] = useTextInput('');
  const [editNickname, onNicknameChangeHandler] = useTextInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const resetInputs = () => {
    setErrorMessage('');
    form.setFieldsValue({
      nickname: '',
      password: '',
    });
  };

  const afterSubmit = () => {
    resetInputs();
    closeModal();
    setIsLoading(false);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files && files.length > 0) {
      const theFile = files[0];
      const _preview = URL.createObjectURL(theFile);
      setPreview(_preview);
      setImgFile(theFile);
    }
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const isSameImage = imgFile === null;
    const isSameDispalyName = displayName === editNickname;
    try {
      if (!email) return;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (isSameDispalyName && isSameImage) {
        afterSubmit();
        return;
      } else if (isSameImage) {
        await updateUserDisplayName(userCredential.user, editNickname);
      } else if (isSameDispalyName) {
        await updateUserProfileImage(userCredential.user, imgFile);
      } else {
        await setUserProfileImageAndDisplayName(userCredential.user, imgFile, editNickname);
      }

      if (auth.currentUser) {
        const updateUser: UserInfo = {
          displayName: auth.currentUser.displayName!,
          photoURL: auth.currentUser.photoURL!,
          email: auth.currentUser.email!,
          id: auth.currentUser.uid,
        };
        refreshUserInfo(updateUser);
      }

      afterSubmit();
      message.success('프로필이 수정되었습니다.');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('비밀번호가 틀립니다.');
        setIsLoading(false);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      resetInputs();
    };
  }, []);

  return (
    <St.ProfileContainer>
      <h2>내정보 수정</h2>
      <Form
        form={form}
        onFinish={submitHandler}
        layout="vertical"
        autoComplete="off"
        name="validateOnly"
      >
        <Form.Item>
          <St.FileLabel htmlFor="fileInput">
            <St.ProfileImage src={preview ?? photoURL ?? ''} alt="프로필 사진" />
          </St.FileLabel>
          <St.CustomFileInput type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
        </Form.Item>

        <Form.Item label="아이디">
          <Input value={email ?? ''} disabled />
        </Form.Item>

        <Form.Item
          label="닉네임"
          name="nickname"
          rules={[
            { required: true, message: '닉네임을 입력해주세요.' },
            { min: 2, max: 6, message: '닉네임은 2~6글자로 제한됩니다.' },
          ]}
        >
          <Input onChange={onNicknameChangeHandler} placeholder="닉네임 입력" />
        </Form.Item>

        <Form.Item
          label="현재 비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password onChange={onPasswordChangeHandler} />
        </Form.Item>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <St.ButtonContainer>
          <St.Button type="default" htmlType="submit">
            수정완료
            {isLoading && <Spin style={{ marginLeft: '8px' }} />}
          </St.Button>
        </St.ButtonContainer>
      </Form>
    </St.ProfileContainer>
  );
};

export default EditProfileForm;
