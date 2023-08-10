import { styled } from 'styled-components';

export const CommentsContaine = styled.div`
  height: 500px;
  padding: 20px;
  flex-basis: 500px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #9acdde;
`;

export const CommentsTitle = styled.h3`
  font-size: larger;
`;

export const CommentsBox = styled.div`
  padding: 20px;
  overflow: auto;
`;
