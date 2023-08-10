import CourseResult from '../components/courseResult/CourseResult';
import SearchForm from '../components/searchForm/SearchForm';
import ResultMap from '../components/resultMap/ResultMap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResult = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // useEffect(() => {
  //   return setSearchKeyword('');
  // }, []);
  
  return (
    <main>
      <SearchForm setSearchKeyword={setSearchKeyword} />
      <div style={{ background: '#ddd', width: '100%', height: '300px' }}>지도영역</div>
      <CourseResult searchKeyword={searchKeyword} />
    </main>
  );
};

export default SearchResult;
