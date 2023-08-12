import { styled } from 'styled-components';

export const CarouselContainer = styled.section`
  & .flicking-arrow-prev,
  .flicking-arrow-prev,
  .flicking-arrow-next,
  .flicking-arrow-next {
    background-color:#fff ;
  }

  & .flicking-arrow-prev::before,
  .flicking-arrow-prev::after,
  .flicking-arrow-next::before,
  .flicking-arrow-next::after {
    background-color: rgba(0, 0, 0, 1);
  }
`;
