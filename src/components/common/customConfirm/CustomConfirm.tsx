import { ExclamationCircleOutlined } from '@ant-design/icons';
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
      title={
        <>
          <ExclamationCircleOutlined style={{ color: 'orange', marginRight: 8 }} />
          확인
        </>
      }
      open={confirmVisible}
      onOk={() => {
        confirmCallback();
        hideConfirm();
      }}
      onCancel={hideConfirm}
      okText="확인"
      cancelText="취소"
      closable={false}
    >
      <p>{confirmContent}</p>
    </Modal>
  );
};

export default CustomConfirm;
