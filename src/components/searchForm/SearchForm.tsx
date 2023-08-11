import React, { useCallback, useState } from 'react';
import * as St from './style';
import { Button, Input, Space, Select } from 'antd';

type SearchFormProps = {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectKeyword: React.Dispatch<React.SetStateAction<string>>;
  roadName: string;
};

const SearchForm = ({ setSearchKeyword, setSelectKeyword, roadName }: SearchFormProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

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
      setSearchKeyword(searchValue);
      setSelectKeyword(selectedValue);
      setSearchValue('');
    },
    [searchValue, selectedValue],
  );

  return (
    <St.SearchFormContainer onSubmit={onSubmitSearchHandler}>
      <Space.Compact>
        <Select
          defaultValue={roadName}
          options={options}
          size="large"
          onSelect={(value) => setSelectedValue(value)}
        />
        <Input
          id="search"
          type="text"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
          size="large"
          placeholder="지역을 입력해 주세요"
        />
        <Button htmlType="submit" size="large">
          검색버튼
        </Button>
      </Space.Compact>
    </St.SearchFormContainer>
  );
};

export default SearchForm;
