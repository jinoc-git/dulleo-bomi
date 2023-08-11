import styled from 'styled-components';

export const BackTopBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 50px;
  width: 50px;
  opacity: 0.8;
  background-color: #9acdde;
  border-radius: 50%;

  &:hover {
    background-color: #b8e3e8;
  }

  &:active {
    background-color: #67bed0;
  }
`;

export const ButtonImg = styled.img`
  height: 40px;
  width: 30px;
  object-fit: cover;
`;
