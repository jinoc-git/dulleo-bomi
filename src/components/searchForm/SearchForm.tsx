import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as St from './style';
import { Button, Input } from 'antd';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const onSubmitSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <St.SearchFormContainer onSubmit={onSubmitSearchHandler}>
      <label htmlFor="search">검색</label>
      <Input id="search" type="text" value={searchValue} onChange={({ target }) => setSearchValue(target.value)} />
      <Button htmlType="submit">검색버튼</Button>
    </St.SearchFormContainer>
  );
};

export default SearchForm;
