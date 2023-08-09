import { styled } from 'styled-components';

export const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #dcdcdc;

  &:last-child {
    border: none;
  }
`

export const CommentItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const CommentWriterName = styled.p`
  font-size: 1rem;
`

export const CommentContent = styled.p`
  font-size: 1rem;
  word-break: break-all;
`