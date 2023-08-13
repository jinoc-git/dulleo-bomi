import { styled } from 'styled-components';

export const CarouselContainer = styled.section`
  position: relative;

  & .prev-button {
    position: absolute;
    top: -32px;
    right: 0;
  }

  & .next-button {
    position: absolute;
    top: 0;
    right: 0;
    span {
      position: relative;
      top: 2px;
    }
  }
`;

export const Box = styled.div`
  display: flex;
  overflow: hidden;
`;
