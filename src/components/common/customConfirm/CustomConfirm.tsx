import { Modal } from 'antd';
import React from 'react';
import { useDialogStore } from '../../../zustand/DialogStore';

const CustomConfirm: React.FC = () => {
  const confirmVisible = useDialogStore((state) => state.confirmVisible);
  const confirmContent = useDialogStore((state) => state.confirmContent);
  const confirmCallback = useDialogStore((state) => state.confirmCallback);
  const hideConfirm = useDialogStore((state) => state.hideConfirm);

  return (
    <Modal
      title="확인"
      visible={confirmVisible}
      onOk={() => {
        confirmCallback();
        hideConfirm();
      }}
      onCancel={hideConfirm}
    >
      <p>{confirmContent}</p>
    </Modal>
  );
};

export default CustomConfirm;
