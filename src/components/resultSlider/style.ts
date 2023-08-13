import { styled } from 'styled-components';
export const SliderContainer = styled.section`
  padding: 20px 0 50px;
  overflow: hidden;
`;
export const SliderItem = styled.div`
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 30px;
    filter: brightness(0.7);
    transition: all 0.4s;
  }
  div {
    font-family: 'TheJamsil5Bold', 'sans-serif';
    position: absolute;
    right: 10%;
    bottom: 10%;
    color: #fff;
    font-size: 1.2rem;
    text-align: right;
    p {
      font-size: 2rem;
    }
    @media screen and (max-width: 768px) {
      font-size: 0.7rem;
      p {
        font-size: 1.2rem;
      }
    }
  }
  &:hover {
    img {
      filter: brightness(1);
    }
  }
`;
