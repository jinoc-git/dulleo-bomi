import { styled } from 'styled-components';

export const CarouselContainer = styled.section`
  position: relative;

  & .prev-button {
    position: absolute;
    top: -50px;
    right: 50px;
  }

  & .next-button {
    position: absolute;
    top: -50px;
    right: 0;
  }
`;

export const Box = styled.div`
  display: flex;
  overflow: hidden;
`;
