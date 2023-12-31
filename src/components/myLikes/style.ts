import { styled } from 'styled-components';

export const LikesContaine = styled.div`
  height: 500px;
  padding: 20px;
  flex-basis: 500px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: solid 1px #ddd;
`;

export const LikesBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
`;

export const Likeitem = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: solid 3px #9acdde;
  cursor: pointer;
`;

export const LikeTitleParagraph = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;
