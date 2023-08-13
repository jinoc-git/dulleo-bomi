import * as St from './style';
import { Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <St.SpinnerContainer>
      <St.SpinnerBox>
        <Spin tip="Loading" size="large" />
      </St.SpinnerBox>
    </St.SpinnerContainer>
  );
};

export default LoadingSpinner;
