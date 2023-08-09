import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import * as St from './style';
import { Avatar } from 'antd';

const MyProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<any>('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert('로그인이 필요합니다.');
        navigate('/signin');
      }
      setUser(user);
      setImage(user?.photoURL);
    });
  }, [navigate]);

  return (
    <St.ProfileContainer>
      <Avatar size={64} src={image} alt="프로필 이미지" />
      <div>
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
      </div>
    </St.ProfileContainer>
  );
};

export default MyProfile;
