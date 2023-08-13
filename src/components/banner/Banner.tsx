import * as St from './style';
import banner from '../../assets/mainbanner.png';

const Banner = () => {
  return (
    <St.BannerContainer>
      <St.BanneImage src={banner} />
      <St.BannerParagraphBox>
        <h2>한걸음 한걸음 대한민국을 발견하라!</h2>
        <St.BannerParagraph>
          걷기, 자전거 등 인간의 힘을 이용한 <br />
          레저여행에 대해 코스정보를 중심으로 <br />
          주변 관광정보를 알아보세요!
        </St.BannerParagraph>
      </St.BannerParagraphBox>
    </St.BannerContainer>
  );
};

export default Banner;
