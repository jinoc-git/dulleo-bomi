import { styled } from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  width: 50%;
  margin: 30px auto;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  & .ant-select {
    width: 130px;
  }
`;
