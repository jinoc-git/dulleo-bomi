import { styled } from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  width: 50%;
  margin: 30px auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 30px;
  }

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  & .ant-select {
    width: 130px;
  }
`;
