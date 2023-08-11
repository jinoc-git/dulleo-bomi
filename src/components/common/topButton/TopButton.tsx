// TopButton.tsx
import { BackTop } from 'antd';
import { useEffect, useState } from 'react';
import topbtn from '../../../assets/topbtn.png';
import * as St from './style';

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.onscroll = handleScroll;

    return () => {
      document.onscroll = null;
    };
  }, []);

  return (
    <>
      {visible && (
        <BackTop>
          <St.BackTopBox>
            <St.ButtonImg src={topbtn} alt="탑버튼" />
          </St.BackTopBox>
        </BackTop>
      )}
    </>
  );
};

export default TopButton;
