import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useDialogStore } from '../../../zustand/DialogStore';

const CustomAlert: React.FC = () => {
  const alertVisible = useDialogStore((state) => state.alertVisible);
  const alertContent = useDialogStore((state) => state.alertContent);
  const hideAlert = useDialogStore((state) => state.hideAlert);

  const handleOk = () => {
    hideAlert();
  };

  return (
    <Modal
      title={
        <>
          <CheckCircleFilled style={{ color: 'green', marginRight: 8 }} />
          알림
        </>
      }
      open={alertVisible}
      onOk={handleOk}
      closable={false}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      <p>{alertContent}</p>
    </Modal>
  );
};

export default CustomAlert;
