import CourseResult from '../components/courseResult/CourseResult';
import SearchForm from '../components/searchForm/SearchForm';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

const SearchResult = () => {
  const { state } = useLocation();
  const [selectKeyword, setSelectKeyword] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['infiniteCourse']);
    };
  }, []);

  return (
    <SearchResultContainer>
      <SearchForm
        setSearchKeyword={setSearchKeyword}
        setSelectKeyword={setSelectKeyword}
        roadName={state.roadName}
      />
      <CourseResult
        searchKeyword={searchKeyword}
        roadName={selectKeyword ? selectKeyword : state.roadName}
      />
    </SearchResultContainer>
  );
};

export default SearchResult;

const SearchResultContainer = styled.main`
  min-height: calc(100vh - 150px - 235.97px);
`;
