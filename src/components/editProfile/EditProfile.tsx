import { doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Spin, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import useSignUpFormValidator from '../../hooks/useSignUpFormValidator';
import { useTextInput } from '../../hooks/useTextInput';
import { useModal } from '../../zustand/ModalStore';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';

export const EditProfileForm = () => {
  const { user, refreshUserInfo } = useUserStore((state) => ({
    user: state.user,
    refreshUserInfo: state.refreshUserInfo,
  }));

  const { photoURL, email, id } = user ?? {};
  const [form] = Form.useForm();
  const { closeModal } = useModal();

  const [password, onPasswordChangeHandler] = useTextInput('');
  const [editNickname, onNicknameChangeHandler] = useTextInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { nickNameValidator } = useSignUpFormValidator(form);

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

  const resetInputs = () => {
    setErrorMessage('');
    form.setFieldsValue({
      nickname: '',
      password: '',
    });
  };

  useEffect(() => {
    return () => {
      resetInputs();
    };
  }, []);

  console.log('닉네임', editNickname);
  console.log('비번', password);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      if (!user || !id) return;
      refreshUserInfo({ ...user, displayName: editNickname }); // 먼저 닉네임 변경 반영

      if (imgFile) {
        const imageRef = ref(storage, `profiles/${id}`);
        await uploadBytes(imageRef, imgFile);
        const attachmentUrl = await getDownloadURL(imageRef);
        updateDoc(doc(db, 'users', id), { photoURL: attachmentUrl });

        refreshUserInfo({ ...user, photoURL: attachmentUrl, displayName: editNickname }); // 변경된 이미지도 반영
      }

      await message.success('프로필이 수정되었습니다.');
      resetInputs();
      closeModal();
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);
      const firebaseError = getErrorFromFirebase(error);
      setErrorMessage(firebaseError);
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
    mutate();
  };

  const getErrorFromFirebase = (error: any) => {
    if (error.code === 'auth/wrong-password') {
      return '비밀번호가 틀립니다.';
    }
    return '';
  };

  const passwordValidator = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error('비밀번호를 입력해주세요.'));
    } else if (errorMessage) {
      return Promise.reject(new Error(errorMessage));
    } else {
      return Promise.resolve();
    }
  };

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
            nickNameValidator,
          ]}
        >
          <Input onChange={onNicknameChangeHandler} placeholder="닉네임 입력" />
        </Form.Item>

        <Form.Item label="현재 비밀번호" name="password" rules={[{ validator: passwordValidator }]}>
          <Input.Password onChange={onPasswordChangeHandler} />
        </Form.Item>

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
