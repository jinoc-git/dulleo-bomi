import { Avatar, Button, Modal } from 'antd';
import { useModal } from '../../zustand/ModalStore';
import { useUserStore } from '../../zustand/UserStore';
import EditProfile from '../editProfile/EditProfile';
import * as St from './style';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);
  const { isModalVisible, showModal, closeModal } = useModal();

  return (
    <St.ProfileContainer>
      <>
        <Avatar size={64} src={user?.photoURL} alt="프로필 이미지" />
        <div>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
        <Button onClick={showModal}>수정완료</Button>
      </>
      <Modal visible={isModalVisible} onOk={closeModal} onCancel={closeModal} footer={null}>
        <EditProfile />
      </Modal>
    </St.ProfileContainer>
  );
};

export default MyProfile;
