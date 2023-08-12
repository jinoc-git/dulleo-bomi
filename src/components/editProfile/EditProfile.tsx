import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, message, Spin, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FirebaseError } from 'firebase/app';
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../firebase/firebaseConfig';
import * as St from './style';

type EditProfileFormData = {
  currentPassword: string;
  nickname: string;
  email: string;
};

const EditProfileForm = (): ReactElement => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null | undefined>(null);
  const [currentNickname, setCurrentNickname] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setPhotoUrl(auth.currentUser.photoURL);
      form.setFieldsValue({ email: auth.currentUser.email });
      // Set currentNickname here after fetching from the database.
    }
  }, [auth.currentUser]);

  const onSubmit = async (values: unknown) => {
    setIsLoading(true);
    const data = values as EditProfileFormData;

    try {
      // Re-authenticate the user
      if (auth.currentUser) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          data.currentPassword,
        );
        await reauthenticateWithCredential(auth.currentUser!, credential);

        // Update nickname
        // Perform duplication check for the new nickname
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('nickname', '==', data.nickname));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Update user data in the database with the new nickname
          // Assuming 'users' collection exists on Firestore, replace 'your_field_name' with actual path to the nickname field
          const userDocRef = doc(usersRef, auth.currentUser.uid);
          await updateDoc(userDocRef, { your_field_name: data.nickname });

          setCurrentNickname(data.nickname);

          message.success('닉네임이 성공적으로 변경되었습니다.');
        } else {
          message.error('이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
          setIsLoading(false);
          return;
        }

        // Update photoURL if a new photo has been uploaded
        if (fileList.length > 0 && fileList[0]?.originFileObj) {
          const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, fileList[0].originFileObj as Blob);

          const newPhotoUrl = await getDownloadURL(storageRef);
          await updateProfile(auth.currentUser, {
            photoURL: newPhotoUrl,
          });

          setPhotoUrl(newPhotoUrl);
          message.success('프로필 사진이 성공적으로 변경되었습니다.');
        }

        setError(null);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('프로필 변경에 실패했습니다. 다시 시도해 주세요.');
        setIsLoading(false);
      }
    }
  };

  const onFileChange = (info: any) => {
    setFileList(
      info.fileList.slice(-1).map((file: UploadFile) => ({
        ...file.originFileObj,
        uid: file.uid,
        name: file.name,
        status: file.status,
      })),
    );
    setIsLoading(false);
  };

  const beforeUpload = () => {
    setIsLoading(true);
    return false;
  };

  return (
    <St.ProfileContainer>
      <h2>내정보 수정</h2>
      {isLoading ? (
        <Spin />
      ) : (
        <Form layout="vertical" name="editProfile" form={form} onFinish={onSubmit}>
          <Form.Item>
            <img
              src={photoUrl || ''}
              alt="프로필 사진"
              style={{ width: 150, borderRadius: '50%' }}
            />
          </Form.Item>
          <Form.Item>
            <Upload
              fileList={fileList as UploadFile[]}
              beforeUpload={beforeUpload}
              onChange={onFileChange}
            >
              <St.Button icon={<UploadOutlined />}>프로필 사진 변경</St.Button>
            </Upload>
          </Form.Item>
          <Form.Item label="이메일" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해주세요.',
              },
            ]}
            initialValue={currentNickname}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="현재 비밀번호"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: '현재 비밀번호를 입력해주세요.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <St.Button htmlType="submit">프로필 수정</St.Button>
        </Form>
      )}
    </St.ProfileContainer>
  );
};

export default EditProfileForm;
