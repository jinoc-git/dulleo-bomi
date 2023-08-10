import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as St from './style';
import { Button, Input, Space, Select } from 'antd';

type SearchFormProps = {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const SearchForm = ({ setSearchKeyword }: SearchFormProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const options = [
    {
      value: '해파랑길',
      lable: '해파랑길',
    },
    {
      value: '서해랑길',
      lable: '서해랑길',
    },
    {
      value: '남파랑길',
      lable: '남파랑길',
    },
  ];

  const onSubmitSearchHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchValue.length < 2) return;
      setSearchKeyword(searchValue);
      setSearchValue('');
    },
    [searchValue],
  );

  return (
    <St.SearchFormContainer onSubmit={onSubmitSearchHandler}>
      <label htmlFor="search">검색</label>
      <Space.Compact>
        <Select defaultValue={''} />
      <Input
        id="search"
        type="text"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      </Space.Compact>
      <Button htmlType="submit">검색버튼</Button>
    </St.SearchFormContainer>
  );
};

export default SearchForm;
