import { styled } from 'styled-components';

export const RoadListContainer = styled.section`
  margin: 50px 0;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const RoadItem = styled.img`
  cursor: pointer;
  width: calc((100% - 40px) / 3);
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
