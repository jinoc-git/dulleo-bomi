import CourseResult from '../components/courseResult/CourseResult';
import SearchForm from '../components/searchForm/SearchForm';
import ResultMap from '../components/resultMap/ResultMap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

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
    <main>
      <SearchForm
        setSearchKeyword={setSearchKeyword}
        setSelectKeyword={setSelectKeyword}
        roadName={state.roadName}
      />
      <div style={{ background: '#ddd', width: '100%', height: '300px' }}>지도영역</div>
      <CourseResult
        searchKeyword={searchKeyword}
        roadName={selectKeyword ? selectKeyword : state.roadName}
      />
    </main>
  );
};

export default SearchResult;
