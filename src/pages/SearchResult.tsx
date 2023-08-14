import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import CourseResult from '../components/courseResult/CourseResult';
import ResultSlider from '../components/resultSlider/ResultSlider';
import SearchForm from '../components/searchForm/SearchForm';

const SearchResult = () => {
  const { state } = useLocation();
  const [selectKeyword, setSelectKeyword] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.roadName) {
      setSelectKeyword(state.roadName);
    }
    return () => {
      queryClient.removeQueries(['infiniteCourse']);
    };
  }, []);

  return (
    <SearchResultContainer>
      <ResultSlider setSelectKeyword={setSelectKeyword} setSearchKeyword={setSearchKeyword} />
      <SearchForm
        setSearchKeyword={setSearchKeyword}
        setSelectKeyword={setSelectKeyword}
        roadName={selectKeyword ? selectKeyword : state.roadName}
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
