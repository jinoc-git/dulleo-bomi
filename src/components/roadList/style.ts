import { styled } from 'styled-components';

export const RoadListContainer = styled.section`
  margin-bottom: 50px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
`

export const RoadItem = styled.img`
  cursor: pointer;
  width: 340px;
`