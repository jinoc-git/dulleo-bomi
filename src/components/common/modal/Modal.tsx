import React from 'react';
import { Button, Modal as AntdModal, Space } from 'antd';
import * as St from './style';

const Modal = () => {
  return (
    <>
      <Button
        type="primary"
        // onClick={}
      >
        Modal
      </Button>
      <AntdModal
        title="Modal"
        // open={open}
        // onOk={hideModal}
        // onCancel={hideModal}
        okText="확인"
        cancelText="취소"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </AntdModal>
    </>
  );
};

export default Modal;
