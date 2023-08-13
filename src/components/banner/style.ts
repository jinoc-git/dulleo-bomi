import { styled } from 'styled-components';

export const BannerContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 420px;
  max-height: 600px;
`;

export const BanneImage = styled.img`
  width: 100%;
  min-height: 420px;
  max-height: 600px;
  object-fit: cover;
  filter: contrast(1.1);
`;
export const BannerParagraphBox = styled.div`
  position: absolute;
  top: 80px;
  right: 50px;
  color: #fff;
  font-size: 24px;
  line-height: 1.8;
  text-align: right;
`;

export const BannerParagraph = styled.p`
  @font-face {
    font-family: 'HakgyoansimWoojuR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'HakgyoansimWoojuR', sans-serif;
  font-size: 20px;
  line-height: 1.5;
`;
