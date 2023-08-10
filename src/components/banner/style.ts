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

export const BannerParagraph = styled.p`
  position: absolute;
  top: 80px;
  right: 50px;
  color: #fff;
  font-size: 24px;
  line-height: 1.8;
  text-align: right;
`;

