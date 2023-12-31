import { styled } from 'styled-components';

export const LikeContainer = styled.div`
  width: 100px;
  padding: 5px;
  display: flex;
  align-items: baseline;
  gap: 5px;
  svg {
    filter: invert(74%) sepia(26%) saturate(656%) hue-rotate(143deg) brightness(90%) contrast(87%);
    position: relative;
    top: 3px;
    font-size: 16px;
  }
`;

export const LikeCount = styled.p`
  position: relative;
`;
