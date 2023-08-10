import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';
import { Avatar } from 'antd';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <St.ProfileContainer>
      <Avatar size={64} src={user?.photoURL} alt="프로필 이미지" />
      <div>
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
      </div>
    </St.ProfileContainer>
  );
};

export default MyProfile;
