import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDialogStore } from '../../../zustand/DialogStore';

const CustomAlert: React.FC = () => {
  const alertVisible = useDialogStore((state) => state.alertVisible);
  const alertContent = useDialogStore((state) => state.alertContent);
  const hideAlert = useDialogStore((state) => state.hideAlert);

  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (alertVisible) {
      const timer = setInterval(() => {
        setCounter((current) => current - 1);
      }, 1000);

      setTimeout(() => {
        hideAlert();
        setCounter(5);
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [alertVisible, hideAlert]);

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
      visible={alertVisible}
      onOk={handleOk}
      closable={false}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          확인 ({counter}초 후 자동 닫힘)
        </Button>,
      ]}
    >
      <p>{alertContent}</p>
    </Modal>
  );
};

export default CustomAlert;
