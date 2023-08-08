import React from 'react';
import * as St from './style';

const Banner = () => {
  return (
    <St.BannerContainer>
      <St.BanneImage src="https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/file/2022/06/3e10fcaf2e6941d99b8d8bb5d9938a39.jpg" />
      <St.BannerParagraph>
        걷기, 자전거 등 인간의 힘을 이용한 <br />
        레저여행에 대해 코스정보를 중심으로 <br />
        주변 관광정보를 알아보세요!
      </St.BannerParagraph>
    </St.BannerContainer>
  );
};

export default Banner;
