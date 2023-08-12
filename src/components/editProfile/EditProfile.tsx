import { doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import { useInput } from '../../hooks/useInput';
import { useModal } from '../../zustand/ModalStore';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';

export const EditProfileForm = () => {
  const { user, refreshUserInfo } = useUserStore((state) => ({
    user: state.user,
    refreshUserInfo: state.refreshUserInfo,
  }));

  const { closeModal } = useModal();
  const { photoURL, email, id } = user ?? {};

  const [password, onPasswordChangeHandler] = useInput('');
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput('');
  const [editNickname, onNicknameChangeHandler] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const updateProfile = async () => {
    if (!email) {
      setErrorMessage('이메일이 없습니다.');
      return;
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential) {
      if (id) {
        await updateDoc(doc(db, 'users', id), {
          displayName: editNickname,
        });
      }
    }
  };

  const { mutate, reset } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await message.success('프로필이 수정되었습니다.');
      refreshUserInfo({ displayName: editNickname });
      reset();
    },
    onError: (error: any) => {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('비밀번호가 틀립니다.');
      } else {
        setErrorMessage('중복된 닉네임입니다.');
      }
    },
  });

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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    if (!imgFile) {
      mutate();
      return;
    }
    if (!id) {
      setErrorMessage('유저 ID가 존재하지 않습니다.');
      return;
    }
    const imageRef = ref(storage, `profiles/${id}`);
    await uploadBytes(imageRef, imgFile);
    const attachmentUrl = await getDownloadURL(imageRef);
    updateDoc(doc(db, 'users', id), { photoURL: attachmentUrl });
    refreshUserInfo({ photoURL: attachmentUrl });

    mutate();
    closeModal();
  };

  return (
    <St.ProfileContainer>
      <h2>내정보 수정</h2>
      <Form onFinish={submitHandler} layout="vertical" autoComplete="off" name="validateOnly">
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
          <Input
            value={editNickname}
            onChange={onNicknameChangeHandler}
            placeholder="닉네임 입력"
          />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password
            value={password}
            onChange={onPasswordChangeHandler}
            placeholder="비밀번호 입력"
          />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="confirmPassword"
          rules={[{ required: true, message: '비밀번호를 한 번 더 입력해주세요.' }]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={onConfirmPasswordChangeHandler}
            placeholder="비밀번호를 한번 더 작성해주세요"
          />
        </Form.Item>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <St.ButtonContainer>
          <St.Button type="default" htmlType="submit">
            수정완료
          </St.Button>
        </St.ButtonContainer>
      </Form>
    </St.ProfileContainer>
  );
};

export default EditProfileForm;
